export abstract class ILogger {
  abstract info(code: string, message: string, data?: any): void;
  abstract warn(code: string, message: string, data?: any): void;
  abstract debug(code: string, message: string, data?: any): void;
  abstract error(code: string, message: string, data?: any): void;
}
