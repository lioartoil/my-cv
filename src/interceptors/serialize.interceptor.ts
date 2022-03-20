import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

export function Serialize(dto: unknown) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

class SerializeInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private dto: any) {}

  intercept(_: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
    return next
      .handle()
      .pipe(
        map((data: unknown) => plainToInstance(this.dto, data, { excludeExtraneousValues: true })),
      );
  }
}
