import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { EnvironmentVariables, EnvironmentVariablesType } from '@config/environment-variables';
import { JwtGuard } from '@module/_shared/guards/jwt.guard';
import { RoleGuard } from '@module/_shared/guards/role.guard';
import { UseRole } from '@module/_shared/decorators/roles.decorator';
import { RoleEnum } from '@module/_shared/enums/role.enum';
import { ContextUserEnum } from '@module/_shared/enums/context.enum';
import { UploadFileOutput } from '@module/_shared/dto/upload-file.dto';
import { UserData } from '@module/User/infra/entity/user';
import { ListUserInput, ListUserOutput } from '@module/User/dtos/list-user.dto';
import { CreateUserInput, CreateUserOutput } from '@module/User/dtos/create-user.dto';
import { UpdateUserInput, UpdateUserOutput } from '@module/User/dtos/update-user.dto';
import { FindUserService } from '@module/User/services/find.service';
import { FindOneUserService } from '@module/User/services/find-one.service';
import { CreateUserService } from '@module/User/services/create.service';
import { UpdateUserService } from '@module/User/services/update.service';
import { DeleteUserService } from '@module/User/services/delete.service';
import { UploadFileService } from '@module/User/services/upload-file.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    @Inject(EnvironmentVariables.KEY)
    private readonly config: EnvironmentVariablesType,
    private readonly createUserService: CreateUserService,
    private readonly findUserService: FindUserService,
    private readonly findOneUserService: FindOneUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
    private readonly uploadFile: UploadFileService,
  ) {}

  @Get()
  @UseRole(RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Get All Users' })
  public async find(@Query() { limit, skip, sort }: ListUserInput): Promise<ListUserOutput> {
    return this.findUserService.execute({ limit, skip, sort });
  }

  @Get(':id')
  @UseRole(RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Get User By ID' })
  public async findOne(@Param('id') id: string): Promise<UserData> {
    return this.findOneUserService.execute(id);
  }

  @Post()
  @UseRole(RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Create User' })
  public async create(@Body() body: CreateUserInput): Promise<CreateUserOutput> {
    return this.createUserService.execute(body);
  }

  @Put(':id')
  @UseRole(RoleEnum.USER)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Update User' })
  public async update(@Param('id') id: string, @Body() body: UpdateUserInput): Promise<UpdateUserOutput> {
    return this.updateUserService.execute(id, body);
  }

  @Delete(':id')
  @UseRole(RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete User' })
  public async delete(@Param('id') id: string): Promise<void> {
    await this.deleteUserService.execute(id);
  }

  @Post('upload/:context')
  @UseRole(RoleEnum.USER)
  @UseGuards(JwtGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('file'))
  public sendFile(
    @Param('context') context: ContextUserEnum,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadFileOutput> {
    return this.uploadFile.execute({ context, file });
  }
}
