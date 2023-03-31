import { Inject, Injectable } from '@nestjs/common';
import { CloudWatchLogs } from '@aws-sdk/client-cloudwatch-logs';
import { createLogger, format, Logger } from 'winston';
import * as WinstonCloudWatch from 'winston-cloudwatch';
import { EnvironmentVariables, EnvironmentVariablesType } from '@config/environment-variables';
import { capitalizeFirstLetter } from '../util/capitalize-fist-letter';
import { ILogger } from '../interface/logger';

@Injectable()
export class LoggerService implements ILogger {
  private logger: Logger;

  constructor(
    @Inject(EnvironmentVariables.KEY)
    private readonly config: EnvironmentVariablesType,
    private readonly service: string,
    private readonly tracerId: Function,
  ) {
    this.logger = createLogger({
      format: format.combine(format.timestamp(), format.json()),
      defaultMeta: { service },
    });
  }

  private createTransport = (level: string): void => {
    this.logger.add(
      new WinstonCloudWatch({
        cloudWatchLogs: new CloudWatchLogs({ region: this.config.aws.region }),
        awsRegion: this.config.aws.region,
        logGroupName: `${capitalizeFirstLetter(this.config.environment)}-${this.service}`,
        logStreamName: `${this.service}`,
        level: String(level),
        jsonMessage: true,
      }),
    );
  };

  private removeTransport = (): void => {
    this.logger.clear();
  };

  private createLogFunction = (level: string, code: string, message: string, data?: any) => {
    this.createTransport(level);
    this.logger[level]({ code, message, data, tracerId: this.tracerId() });
    this.removeTransport();
  };

  public info = (code: string, message: string, data?: any): void => {
    this.createLogFunction('info', code, message, data);
  };

  public warn = (code: string, message: string, data?: any): void => {
    this.createLogFunction('warn', code, message, data);
  };

  public debug = (code: string, message: string, data?: any): void => {
    this.createLogFunction('debug', code, message, data);
  };

  public error = (code: string, message: string, data?: any): void => {
    this.createLogFunction('error', code, message, data);
  };
}
