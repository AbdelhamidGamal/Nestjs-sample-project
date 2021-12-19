import { NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private DTO: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // run something before request is handled
    // by the request handler

    return next.handle().pipe(
      map((data: any) => {
        // run something before the response is sent out
        console.log(' before the response is sent out', data);
        return plainToInstance(this.DTO, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
