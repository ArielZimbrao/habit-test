import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { FilterMessageDto } from './dto/filter-message.dto';
import PageData from 'src/util/pagination.type';
import { MessageEntity } from 'src/configuration/database/entities/message.entity';
import { RoleInterceptor } from 'src/configuration/roles.interceptor';
import { RoleUserEnum } from 'src/util/enum/role.enum';
import { Context } from 'src/configuration/context/context';

@ApiTags('messages')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOkResponse({
    type: MessageEntity,
  })
  @ApiOperation({
    summary: 'Create Message Endpoint',
    description: 'POST endpoint to create a new message in the system',
  })
  @UseInterceptors(new RoleInterceptor([RoleUserEnum.USER]))
  async create(@Body() body: CreateMessageDto): Promise<MessageEntity> {
    const message = await this.messageService.create(body);
    return message;
  }

  @Get()
  @ApiOkResponse({
    type: PageData<MessageEntity>,
  })
  @ApiOperation({
    summary: 'Get All Messages Endpoint',
    description: 'GET endpoint to get all messages in the system',
  })
  @UseInterceptors(new RoleInterceptor([RoleUserEnum.USER]))
  async findAll(@Query() params: FilterMessageDto): Promise<PageData<MessageEntity>> {
    const messages = await this.messageService.findAll(params);
    return messages;
  }

  @Get(':id')
  @ApiOkResponse({
    type: MessageEntity,
  })
  @ApiOperation({
    summary: 'Get One Message Endpoint',
    description: 'GET endpoint to get one message in the system',
  })
  @UseInterceptors(new RoleInterceptor([RoleUserEnum.USER]))
  async findOne(@Param('id') id: string): Promise<MessageEntity> {
    const message = await this.messageService.findOne(id);
    return message;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete User Endpoint',
    description: 'DELETE endpoint to delete a user in the system',
  })
  @UseInterceptors(new RoleInterceptor([RoleUserEnum.ADMIN, RoleUserEnum.USER]))
  async delete(@Param('id') id: string): Promise<void> {
    await this.messageService.delete(id);
  }
}
