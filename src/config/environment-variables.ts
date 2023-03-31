import { registerAs, ConfigType } from '@nestjs/config';

export const EnvironmentVariables = registerAs('config', () => {
  return {
    environment: process.env.NODE_ENV,
    app: {
      driver: {
        mailDriver: process.env.MAIL_DRIVER,
        mailTemplateDriver: process.env.MAIL_TEMPLATE_DRIVER,
        storageDriver: process.env.STORAGE_DRIVER,
        tokenDriver: process.env.TOKEN_DRIVER,
        cryptographyDriver: process.env.CRYPTOGRAPHY_DRIVER,
      },
      frontWebUrl: process.env.FRONT_WEB_URL,
      serverUrl: process.env.SERVER_URL,
      port: process.env.PORT,
      uploadFileLimitSize: process.env.UPLOAD_FILE_LIMIT_SIZE,
    },
    database: {
      uri: process.env.MONGODB_CONNECTION,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
    aws: {
      accountNumber: process.env.AWS_ACCOUNT_NUMBER,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      bucketName: process.env.AWS_BUCKET_NAME,
      mailFrom: process.env.AWS_MAIL_FROM,
      mailName: process.env.AWS_MAIL_NAME,
    },
  };
});

export type EnvironmentVariablesType = ConfigType<typeof EnvironmentVariables>;
