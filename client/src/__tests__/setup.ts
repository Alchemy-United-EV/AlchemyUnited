import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock fetch for API calls
global.fetch = vi.fn();

// Mock console methods to reduce test noise
const originalError = console.error;
const originalWarn = console.warn;

beforeEach(() => {
  // Reset all mocks
  vi.clearAllMocks();
  
  // Mock fetch responses
  (global.fetch as any).mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({ success: true })
  });
});

// Suppress expected console errors/warnings during tests
console.error = vi.fn();
console.warn = vi.fn();

// Restore after tests
afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});