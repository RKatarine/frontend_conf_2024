import {
  ArgumentsHost,
  Catch,
  ValidationError,
  ExceptionFilter,
  UnprocessableEntityException,
  ValidationPipe as NestValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { Response } from 'express';

import { ResponseError } from './app-exception.filter';

const defaultOptions: ValidationPipeOptions = {
  transform: true,
  forbidUnknownValues: false,
  exceptionFactory: (errors: ValidationError[]) => {
    return new ValidationException('Validation error', errors);
  },
};

export class ValidationException extends UnprocessableEntityException {
  errors: ValidationError[];

  constructor(message: string, errors: ValidationError[]) {
    super(message);
    this.errors = errors;
  }
}

export class ValidationPipe extends NestValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({ ...defaultOptions, ...options });
  }
}

// TODO: i18n
@Catch(ValidationException)
export class ValidationExceptionFilter
  implements ExceptionFilter<ValidationException>
{
  public catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const response = ctx.getResponse() as Response;
    const details = exception.errors.reduce((acc, error) => {
      const { property, constraints } = error;
      acc[property] = Object.values(constraints).join(', ');
      return acc;
    }, {});
    const body: ResponseError = {
      statusCode: 422,
      message: Object.values(details).flat().join(', '),
      details,
      timestamp: new Date().toISOString(),
      user: req.user?.id || null,
      path: req.url || 'unknown',
    };

    response.status(422).json(body);
  }
}
