import {
  Body,
  Controller,
  Delete,
  Post,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import PageData from 'src/util/pagination.type';
import { Context } from 'src/configuration/context/context';
import { UserEntity } from 'src/configuration/database/entities/user.entity';
import { RoleInterceptor } from 'src/configuration/roles.interceptor';
import { RoleUserEnum } from 'src/util/enum/role.enum';
import { ApplicationIdIsRequiredError } from 'src/exception/exception';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly context: Context) {}

  @Post()
  @ApiOkResponse({
    type: UserEntity,
  })
  @ApiOperation({
    summary: 'Create User Endpoint',
    description: 'POST endpoint to create a new user in the system',
  })
  @UseInterceptors(new RoleInterceptor([RoleUserEnum.ADMIN]))
  async create(@Body() body: CreateUserDto): Promise<UserEntity> {
    if (body.role === RoleUserEnum.USER && !body.applicationId) {
      throw new ApplicationIdIsRequiredError();
    }
    const user = await this.userService.create(body);
    return user;
  }

  @Get()
  @ApiOkResponse({
    type: PageData<UserEntity>,
  })
  @ApiOperation({
    summary: 'Get All Users Endpoint',
    description: 'GET endpoint to get all users in the system',
  })
  @UseInterceptors(new RoleInterceptor([RoleUserEnum.ADMIN]))
  async findAll(@Query() params: FilterUserDto): Promise<PageData<UserEntity>> {
    const users = await this.userService.findAll(params);
    return users;
  }

  @Get(':id')
  @ApiOkResponse({
    type: UserEntity,
  })
  @ApiOperation({
    summary: 'Get One User Endpoint',
    description: 'GET endpoint to get one user in the system',
  })
  @UseInterceptors(new RoleInterceptor([RoleUserEnum.ADMIN, RoleUserEnum.USER]))
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    const user = await this.userService.findOne(id, this.context.getApplicationId());
    return user;
  }
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete User Endpoint',
    description: 'DELETE endpoint to delete a user in the system',
  })
  @UseInterceptors(new RoleInterceptor([RoleUserEnum.ADMIN, RoleUserEnum.USER]))
  async delete(@Param('id') id: string): Promise<void> {
    const userContext = await this.context.getUser();

    if (userContext.role !== RoleUserEnum.ADMIN && userContext.id !== id) {
      throw new ApplicationIdIsRequiredError();
    }
    await this.userService.delete(id);
  }
}
