import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { currentUser } = context.switchToHttp().getRequest();
    console.log('adminGuard', currentUser);

    if (!currentUser) {
      return false;
    }

    return currentUser.admin;
  }
}
