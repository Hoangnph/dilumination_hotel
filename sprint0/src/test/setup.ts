import { config } from 'dotenv';

// Load environment variables from .env.test
config({ path: '.env.test' });

// Set test environment
process.env.NODE_ENV = 'test';

// Global test timeout
jest.setTimeout(10000); 