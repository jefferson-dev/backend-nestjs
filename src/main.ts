import { resolve } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TracerMiddleware } from '@infra/middlewares/rTracer';
import { loggerResquestMiddleware } from '@infra/middlewares/requests';
import { AppModule } from './app.module';

NestFactory.create<NestExpressApplication>(AppModule, { cors: true }).then(async (app) => {
  app.enableCors();
  app.use(TracerMiddleware);
  app.use(loggerResquestMiddleware);
  app.useStaticAssets(resolve(__dirname, '..', 'tmp'), { prefix: '/file' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  SwaggerModule.setup(
    'doc/api',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder().setTitle('Documentation').setVersion('1.0').addBearerAuth().build(),
    ),
  );

  await app.listen(process.env.PORT, null, async () => console.log(`Application is running on: ${await app.getUrl()}`));
});
