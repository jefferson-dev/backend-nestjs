import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '@module/_shared/guards/jwt.guard';
import { RoleGuard } from '@module/_shared/guards/role.guard';
import { UseRole } from '@module/_shared/decorators/roles.decorator';
import { RoleEnum } from '@module/_shared/enums/role.enum';
import { Authenticated } from '@module/_shared/decorators/authenticated.decorator';
import { AuthenticatedPayload } from '@module/_shared/types/payload-jwt';
import { AccountData } from '../infra/entity/account';
import { AuthenticateAccountInput, AuthenticateAccountOutput } from '../dtos/authenticate-account.dto';
import { ListAccountInput, ListAccountOutput } from '../dtos/list-account.dto';
import { CreateAccountInput, CreateAccountOutput } from '../dtos/create-account.dto';
import { UpdateAccountInput, UpdateAccountOutput } from '../dtos/update-account.dto';
import { AuthenticateAccountService } from '../services/authenticate.service';
import { FindAccountService } from '../services/find.service';
import { FindOneAccountService } from '../services/find-one.service';
import { CreateAccountService } from '../services/create.service';
import { UpdateAccountService } from '../services/update.service';
import { DeleteAccountService } from '../services/delete.service';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(
    private readonly authenticateAccountService: AuthenticateAccountService,
    private readonly createAccountService: CreateAccountService,
    private readonly findAccountService: FindAccountService,
    private readonly findOneAccountService: FindOneAccountService,
    private readonly updateAccountService: UpdateAccountService,
    private readonly deleteAccountService: DeleteAccountService,
  ) {}

  @Post('auth')
  @ApiOperation({ summary: 'Authenticate Account' })
  @UseInterceptors()
  public async authenticate(@Body() body: AuthenticateAccountInput): Promise<AuthenticateAccountOutput> {
    return this.authenticateAccountService.execute(body);
  }

  @Get()
  @UseRole(RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Get All Accounts' })
  @ApiBearerAuth()
  public async find(@Query() { limit, skip, sort }: ListAccountInput): Promise<ListAccountOutput> {
    return this.findAccountService.execute({ limit, skip, sort });
  }

  @Get('me')
  @UseRole(RoleEnum.USER)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Get Account Logged' })
  @ApiBearerAuth()
  public async me(@Authenticated() auth: AuthenticatedPayload): Promise<AccountData> {
    return this.findOneAccountService.execute(auth.id);
  }

  @Get(':id')
  @UseRole(RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Get Account By ID' })
  @ApiBearerAuth()
  public async findOne(@Param('id') id: string): Promise<AccountData> {
    return this.findOneAccountService.execute(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create Account' })
  public async create(@Body() body: CreateAccountInput): Promise<CreateAccountOutput> {
    return this.createAccountService.execute(body);
  }

  @Put(':id')
  @UseRole(RoleEnum.USER)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Update Account' })
  @ApiBearerAuth()
  public async update(@Param('id') id: string, @Body() body: UpdateAccountInput): Promise<UpdateAccountOutput> {
    return this.updateAccountService.execute(id, body);
  }

  @Delete(':id')
  @UseRole(RoleEnum.USER)
  @UseGuards(JwtGuard, RoleGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Account' })
  @ApiBearerAuth()
  public async delete(@Param('id') id: string): Promise<void> {
    await this.deleteAccountService.execute(id);
  }
}
