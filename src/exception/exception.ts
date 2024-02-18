import { HttpStatus, HttpException } from '@nestjs/common';

export class AccessUnauthorizedError extends HttpException {
  constructor() {
    super(`Email or password incorrect`, HttpStatus.UNAUTHORIZED);
  }
}

export class UserNotFoundError extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}

export class NoAccessPermissionError extends HttpException {
  constructor() {
    super('You do not have permission to make this request', HttpStatus.FORBIDDEN);
  }
}

export class ApplicationNotFoundError extends HttpException {
  constructor() {
    super('Application not found', HttpStatus.NOT_FOUND);
  }
}

export class ApplicationIdIsRequiredError extends HttpException {
  constructor() {
    super('Application id is required for user creation', HttpStatus.BAD_REQUEST);
  }
}

export class ApplicationAlreadyExistsError extends HttpException {
  constructor() {
    super('Application already exists', HttpStatus.BAD_REQUEST);
  }
}

export class UserAlreadyExistsError extends HttpException {
  constructor() {
    super('User already exists', HttpStatus.BAD_REQUEST);
  }
}
