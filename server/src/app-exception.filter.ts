import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
  Logger,
  HttpServer,
} from '@nestjs/common';
import { isObject } from '@nestjs/common/utils/shared.utils';
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core';
import { MESSAGES } from '@nestjs/core/constants';

export interface ErrorInfo {
  timestamp: string;
  user?: string;
  path: string;
}

export interface ResponseError extends ErrorInfo {
  statusCode: number;
  message: string;
  details?: any;
}

@Catch()
export class AppExceptionFilter<T = any> extends BaseExceptionFilter<T> {
  readonly logger = new Logger('ExceptionsHandler');

  catch(exception: T, host: ArgumentsHost) {
    const applicationRef =
      this.applicationRef ||
      (this.httpAdapterHost && this.httpAdapterHost.httpAdapter);

    const ctx = host.switchToHttp();
    const req = ctx.getRequest();

    const info: ErrorInfo = {
      timestamp: new Date().toISOString(),
      user: req.user?.id || null,
      path: req.url || 'unknown',
    };

    if (!(exception instanceof HttpException)) {
      return this.handleUnknownError(exception, host, applicationRef, info);
    }
    const res = exception.getResponse();
    const message = isObject(res)
      ? res
      : {
          statusCode: exception.getStatus(),
          message: res,
          ...info,
        };

    const response = host.getArgByIndex(1);
    if (!applicationRef.isHeadersSent(response)) {
      applicationRef.reply(response, message, exception.getStatus());
    } else {
      applicationRef.end(response);
    }
  }

  public handleUnknownError(
    exception: T,
    host: ArgumentsHost,
    applicationRef: AbstractHttpAdapter | HttpServer,
    info?: ErrorInfo,
  ) {
    const body: ResponseError = this.isHttpError(exception)
      ? {
          statusCode: exception.statusCode,
          message: exception.message,
          ...info,
        }
      : {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            (exception as Error).message || MESSAGES.UNKNOWN_EXCEPTION_MESSAGE,
          ...info,
        };

    const response = host.getArgByIndex(1);
    if (!applicationRef.isHeadersSent(response)) {
      applicationRef.reply(response, body, body.statusCode);
    } else {
      applicationRef.end(response);
    }

    if (this.isExceptionObject(exception)) {
      return this.logger.error(exception.message, exception.stack);
    }
    return this.logger.error(exception);
  }
}
