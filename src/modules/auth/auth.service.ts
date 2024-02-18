import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AccessUnauthorizedError, UserNotFoundError } from 'src/exception/exception';
import { cryptoUtils } from 'src/util/crypto.utils';
import * as ms from 'ms';
import { CredentialDTO } from './dto/credential.dto';
import { TokenResponseDTO } from './dto/token-response.dto';
import { UserRepository } from 'src/configuration/database/repository/user.repository';
import { UserEntity } from 'src/configuration/database/entities/user.entity';
import { RoleUserEnum } from 'src/util/enum/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async addAdminUserIfNotExists() {
    const user = await this.userRepository.findActiveUserEmail('admin@admin.pt');
    if (!user) {
      const cryptoPassword = cryptoUtils.encrypt('admin');
      const newUser = new UserEntity();
      newUser.email = 'admin@admin.pt';
      newUser.name = 'admin';
      newUser.password = await cryptoUtils.preSavePassword(cryptoPassword);
      newUser.role = RoleUserEnum.ADMIN;
      newUser.actived = true;
      newUser.save();
    }
  }

  async login(credentital: CredentialDTO) {
    const user: UserEntity = await this.userRepository.findActiveUserEmail(credentital.email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const compareHash = await cryptoUtils.compare(credentital.password, user.password);

    if (user && compareHash) {
      return this._generateTokens(user).finally(() => {
        user.last_sigin = new Date();
        user.save();
      });
    } else {
      throw new AccessUnauthorizedError();
    }
  }

  private async _generateTokens(user: UserEntity): Promise<TokenResponseDTO> {
    const loginResponseDTO = new TokenResponseDTO();
    loginResponseDTO.applicationId = user.application?.id;

    loginResponseDTO.userId = user.id;

    loginResponseDTO.accessToken = this._generateAccessToken(user);

    loginResponseDTO.expiresIn = this._getExpiresTimeToken();

    loginResponseDTO.role = user.role;

    return loginResponseDTO;
  }

  private _getExpiresTimeToken() {
    return ms(this.configService.get('TOKEN_EXPIRATION'));
  }

  private _generateAccessToken(user: UserEntity): string {
    const data = {
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
      application_id: user.application ? user.application.id : null,
    };

    return this.jwtService.sign(
      {
        ...data,
      },
      {
        expiresIn: this.configService.get('TOKEN_EXPIRATION'),
      },
    );
  }
}
