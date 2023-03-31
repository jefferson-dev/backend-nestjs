import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SqsConfig, SqsModule } from '@nestjs-packages/sqs';
import { EnvironmentVariables, EnvironmentVariablesType } from '@config/environment-variables';
import { AccountModule } from '@module/Account/account.module';
import { UserModule } from '@module/User/user.module';
import { EventModule } from '@module/Event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvironmentVariables],
      envFilePath: join(`env/${process.env.NODE_ENV}.env`),
    }),
    MongooseModule.forRootAsync({
      inject: [EnvironmentVariables.KEY],
      useFactory: ({ database }: EnvironmentVariablesType) => ({
        uri: database.uri,
      }),
    }),
    SqsModule.forRootAsync({
      inject: [EnvironmentVariables.KEY],
      useFactory: ({ aws }: EnvironmentVariablesType) =>
        new SqsConfig({
          region: aws.region,
          endpoint: `https://sqs.${aws.region}.amazonaws.com`,
          accountNumber: aws.accountNumber,
          credentials: {
            accessKeyId: aws.accessKeyId,
            secretAccessKey: aws.secretAccessKey,
          },
        }),
    }),
    AccountModule,
    UserModule,
    EventModule,
  ],
})
export class AppModule {}
