import { Expose, Transform } from 'class-transformer';

import { Report } from '../report.entity';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  lat: number;

  @Expose()
  long: number;

  @Expose()
  make: string;

  @Expose()
  mileage: number;

  @Expose()
  model: string;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  @Transform(({ obj }: { obj: Report }) => obj.user.id)
  userId: number;
}
