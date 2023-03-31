import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentVariables, EnvironmentVariablesType } from '@config/environment-variables';
import { MailModule } from '@infra/providers/mail';
import { StorageModule } from '@infra/providers/storage';
import { GetTracerId } from '@infra/middlewares/rTracer';
import { ILogger, LoggerService } from '@infra/providers/logger';
import { User, UserSchema } from './infra/schema/user.schema';
import { IUserRepository } from './interfaces/user.interface';
import { UserRepository } from './infra/repository/user.repository';
import { UserController } from './controllers/user.controller';
import { FindUserService } from './services/find.service';
import { FindOneUserService } from './services/find-one.service';
import { CreateUserService } from './services/create.service';
import { UpdateUserService } from './services/update.service';
import { DeleteUserService } from './services/delete.service';
import { UploadFileService } from './services/upload-file.service';
import { TokenModule } from '@infra/providers/token';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TokenModule,
    MailModule,
    StorageModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: ILogger,
      inject: [EnvironmentVariables.KEY],
      useFactory: (config: EnvironmentVariablesType) => new LoggerService(config, 'User', GetTracerId),
    },
    { provide: IUserRepository, useClass: UserRepository },
    FindUserService,
    FindOneUserService,
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
    UploadFileService,
  ],
  exports: [CreateUserService, DeleteUserService],
})
export class UserModule {}
