import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Scope } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NoAccessPermissionError } from 'src/exception/exception';
import { RoleUserEnum } from 'src/util/enum/role.enum';

@Injectable({ scope: Scope.REQUEST })
export class RoleInterceptor implements NestInterceptor {
  private roles: RoleUserEnum[] = [];
  constructor(roles: RoleUserEnum[]) {
    this.roles = roles;
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const user = context.switchToHttp().getRequest().user;

    if (this.roles.includes(user.role)) {
      return next.handle().pipe();
    } else {
      throw new NoAccessPermissionError();
    }
  }
}
