import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { logger } from './logger';

export const initSentry = () => {
  const dsn = process.env.SENTRY_DSN;
  
  if (!dsn) {
    logger.warn('SENTRY_DSN not provided, skipping Sentry initialization');
    return;
  }

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV || 'development',
    integrations: [
      // Add profiling integration
      nodeProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    // Profiling sample rate
    profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    // Set release version if available
    release: process.env.npm_package_version,
    // Capture unhandled promise rejections
    beforeSend(event) {
      // Log to Winston as well
      if (event.exception) {
        logger.error('Sentry captured exception', event.exception);
      }
      return event;
    }
  });

  logger.info('Sentry initialized successfully');
};

// Express middleware for Sentry request handling
export const sentryRequestHandler = () => {
  if (!process.env.SENTRY_DSN) {
    return (req: any, res: any, next: any) => next();
  }
  return Sentry.expressIntegration();
};

// Express middleware for Sentry error handling (must be before other error handlers)
export const sentryErrorHandler = () => {
  if (!process.env.SENTRY_DSN) {
    return (error: any, req: any, res: any, next: any) => next(error);
  }
  return Sentry.expressErrorHandler();
};

// Helper function to capture exceptions manually
export const captureException = (error: Error, context?: any) => {
  Sentry.withScope((scope) => {
    if (context) {
      scope.setContext('additional_info', context);
    }
    Sentry.captureException(error);
  });
  
  // Also log to Winston
  logger.error('Exception captured', error, context);
};

// Helper function to capture messages
export const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info', context?: any) => {
  Sentry.withScope((scope) => {
    if (context) {
      scope.setContext('additional_info', context);
    }
    Sentry.captureMessage(message, level);
  });
  
  // Also log to Winston
  logger.info(`Sentry message (${level}): ${message}`, context);
};

export default Sentry;