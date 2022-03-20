import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

interface ClassConstructor {
  new (...args: unknown[]): unknown;
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(_: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
    return next.handle().pipe(
      map((data: ClassConstructor) => {
        return plainToInstance(this.dto, data, { excludeExtraneousValues: true });
      }),
    );
  }
}
