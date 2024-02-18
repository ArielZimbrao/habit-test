import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CredentialDTO } from './dto/credential.dto';
import { TokenResponseDTO } from './dto/token-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @ApiOkResponse({
    type: CredentialDTO,
  })
  @ApiOperation({
    summary: 'Signin Endpoint',
    description: 'POST endpoint to login to the system',
  })
  async signin(@Body() credentialDTO: CredentialDTO): Promise<TokenResponseDTO> {
    return this.authService.login(credentialDTO);
  }
}
