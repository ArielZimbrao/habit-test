import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TokenResponseDTO {
  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIxZDI1OGVkOS1jNGEzLTQ3ZjUtODA3MS1jZDQxZTZhNWJjMWIiLCJjbGllbnRJRCI6IjUwNmZmNTE2NDlmMzkxMGRjZDc4YWIzOTZkN2VjOWY1ZWQzZTIzMDQ0ODI5NTY0OGJiMjJkOWIxM2M0ZDQ5YjEiLCJlbWFpbCI6ImRhbmlsbG9zbEBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTYxMDEyMzg4NywiZXhwIjoxNjEwMTI3NDg3fQ.i5Xt8vG1F4xwaCT56DOekGo5uIWzp-mWveRCvN713Q8',
    description: 'authentication token',
  })
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({
    type: Number,
    description: 'Token expiration time in milliseconds',
  })
  @IsNotEmpty()
  expiresIn: number;

  @ApiProperty({
    type: String,
    description: 'User id',
  })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    type: String,
    description: 'Clinic Id of user',
  })
  @IsNotEmpty()
  applicationId: string;

  @ApiProperty({ description: 'access level' })
  @IsNotEmpty()
  role: string;
}
