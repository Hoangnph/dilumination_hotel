# Thiết Lập Testing Environment

## 1. Test Environment với Docker

### 1.1 Docker Compose cho Testing
```yaml
# docker-compose.test.yml
version: '3.8'

services:
  # Test Database
  test-mysql:
    image: mysql:8.0
    container_name: hotel-test-mysql
    environment:
      MYSQL_ROOT_PASSWORD: ${TEST_MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${TEST_MYSQL_DATABASE}
      MYSQL_USER: ${TEST_MYSQL_USER}
      MYSQL_PASSWORD: ${TEST_MYSQL_PASSWORD}
    ports:
      - "3307:3306"
    volumes:
      - ~/docker/volumes/test-mysql:/var/lib/mysql
    networks:
      - hotel-test-network

  # Test Redis
  test-redis:
    image: redis:7.0-alpine
    container_name: hotel-test-redis
    ports:
      - "6380:6379"
    volumes:
      - ~/docker/volumes/test-redis:/data
    networks:
      - hotel-test-network

  # Test API
  test-api:
    build:
      context: .
      dockerfile: Dockerfile.test
    container_name: hotel-test-api
    environment:
      - NODE_ENV=test
      - DATABASE_URL=mysql://${TEST_MYSQL_USER}:${TEST_MYSQL_PASSWORD}@test-mysql:3306/${TEST_MYSQL_DATABASE}
      - REDIS_URL=redis://test-redis:6379
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - test-mysql
      - test-redis
    networks:
      - hotel-test-network

networks:
  hotel-test-network:
    name: hotel-test-network
```

### 1.2 Dockerfile cho Testing
```dockerfile
# Dockerfile.test
FROM node:20-alpine

WORKDIR /app

# Cài đặt dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Cài đặt testing tools
RUN npm install -g jest
RUN npm install --save-dev @types/jest ts-jest supertest @types/supertest

# Expose test port
EXPOSE 3001

# Run tests
CMD ["npm", "run", "test"]
```

## 2. Unit Testing

### 2.1 Jest Configuration
```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### 2.2 Test Scripts
```json
// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --runInBand"
  }
}
```

## 3. Integration Testing

### 3.1 API Testing với Supertest
```typescript
// src/__tests__/api/auth.test.ts
import request from 'supertest';
import { app } from '../../app';
import { setupTestDatabase, teardownTestDatabase } from '../utils/test-db';

describe('Auth API', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  afterAll(async () => {
    await teardownTestDatabase();
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });
});
```

### 3.2 Database Testing Utilities
```typescript
// src/__tests__/utils/test-db.ts
import { createConnection, Connection } from 'typeorm';
import { config } from '../../config';

export async function setupTestDatabase(): Promise<Connection> {
  const connection = await createConnection({
    ...config.database,
    database: process.env.TEST_MYSQL_DATABASE,
  });

  await connection.synchronize(true);
  return connection;
}

export async function teardownTestDatabase(connection: Connection): Promise<void> {
  await connection.close();
}
```

## 4. E2E Testing

### 4.1 Cypress Configuration
```javascript
// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
```

### 4.2 Cypress Docker Setup
```yaml
# docker-compose.cypress.yml
version: '3.8'

services:
  cypress:
    image: cypress/included:12.3.0
    container_name: hotel-cypress
    environment:
      - CYPRESS_baseUrl=http://host.docker.internal:3000
    volumes:
      - .:/e2e
      - /e2e/node_modules
    working_dir: /e2e
    networks:
      - hotel-test-network

networks:
  hotel-test-network:
    external: true
```

## 5. Performance Testing

### 5.1 Artillery Configuration
```yaml
# artillery/load-test.yml
config:
  target: "http://localhost:3000"
  phases:
    - duration: 60
      arrivalRate: 5
      rampTo: 50
      name: "Ramp up load"
    - duration: 300
      arrivalRate: 50
      name: "Sustained load"
  defaults:
    headers:
      Content-Type: "application/json"

scenarios:
  - name: "API endpoints"
    flow:
      - get:
          url: "/api/hotels"
      - post:
          url: "/api/bookings"
          json:
            hotelId: "123"
            checkIn: "2024-03-01"
            checkOut: "2024-03-05"
```

### 5.2 Artillery Docker Setup
```yaml
# docker-compose.artillery.yml
version: '3.8'

services:
  artillery:
    image: artilleryio/artillery:latest
    container_name: hotel-artillery
    volumes:
      - ./artillery:/artillery
    working_dir: /artillery
    networks:
      - hotel-test-network

networks:
  hotel-test-network:
    external: true
```

## 6. Test Automation

### 6.1 GitHub Actions Workflow
```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Start test environment
        run: docker-compose -f docker-compose.test.yml up -d
      
      - name: Run unit tests
        run: docker-compose -f docker-compose.test.yml exec test-api npm run test
      
      - name: Run integration tests
        run: docker-compose -f docker-compose.test.yml exec test-api npm run test:integration
      
      - name: Run E2E tests
        run: docker-compose -f docker-compose.cypress.yml up --exit-code-from cypress
      
      - name: Upload test coverage
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
```

### 6.2 Test Reports
```bash
#!/bin/bash
# scripts/generate_test_report.sh

# Generate test coverage report
docker-compose -f docker-compose.test.yml exec test-api npm run test:coverage

# Generate performance test report
docker-compose -f docker-compose.artillery.yml run artillery run load-test.yml -o report.json

# Generate HTML report
docker-compose -f docker-compose.artillery.yml run artillery report report.json
```

## 7. Test Data Management

### 7.1 Test Data Seeding
```typescript
// src/__tests__/utils/seed.ts
import { Connection } from 'typeorm';
import { User } from '../../entities/User';
import { Hotel } from '../../entities/Hotel';

export async function seedTestData(connection: Connection): Promise<void> {
  const userRepository = connection.getRepository(User);
  const hotelRepository = connection.getRepository(Hotel);

  // Create test users
  await userRepository.save([
    {
      email: 'test@example.com',
      password: 'hashed_password',
      role: 'customer',
    },
    {
      email: 'admin@example.com',
      password: 'hashed_password',
      role: 'admin',
    },
  ]);

  // Create test hotels
  await hotelRepository.save([
    {
      name: 'Test Hotel 1',
      address: '123 Test St',
      rating: 4.5,
    },
    {
      name: 'Test Hotel 2',
      address: '456 Test Ave',
      rating: 4.0,
    },
  ]);
}
```

### 7.2 Test Data Cleanup
```typescript
// src/__tests__/utils/cleanup.ts
import { Connection } from 'typeorm';

export async function cleanupTestData(connection: Connection): Promise<void> {
  const entities = connection.entityMetadatas;

  for (const entity of entities) {
    const repository = connection.getRepository(entity.name);
    await repository.clear();
  }
}
``` 