import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { CreateApplicationDto } from './dto/create-application.dto';
import { FilterApplicationDto } from './dto/filter-application.dto';
import PageData from 'src/util/pagination.type';
import { ApplicationEntity } from 'src/configuration/database/entities/application.entity';
import { RoleInterceptor } from 'src/configuration/roles.interceptor';
import { RoleUserEnum } from 'src/util/enum/role.enum';

@ApiTags('applications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('applications')
@UseInterceptors(new RoleInterceptor([RoleUserEnum.ADMIN]))
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @ApiOkResponse({
    type: ApplicationEntity,
  })
  @ApiOperation({
    summary: 'Create Application Endpoint',
    description: 'POST endpoint to create a new application in the system',
  })
  async create(@Body() body: CreateApplicationDto): Promise<ApplicationEntity> {
    const application = await this.applicationService.create(body);
    return application;
  }

  @Get()
  @ApiOkResponse({
    type: PageData<ApplicationEntity>,
  })
  @ApiOperation({
    summary: 'Get All Applications Endpoint',
    description: 'GET endpoint to get all applications in the system',
  })
  async findAll(@Query() params: FilterApplicationDto): Promise<PageData<ApplicationEntity>> {
    const applications = await this.applicationService.findAll(params);
    return applications;
  }

  @Get(':id')
  @ApiOkResponse({
    type: ApplicationEntity,
  })
  @ApiOperation({
    summary: 'Get One Application Endpoint',
    description: 'GET endpoint to get one application in the system',
  })
  async findOne(@Param('id') id: string): Promise<ApplicationEntity> {
    const application = await this.applicationService.findOne(id);
    return application;
  }
}
