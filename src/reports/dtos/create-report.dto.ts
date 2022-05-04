import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReportDto {
  @IsLatitude()
  lat: number;

  @IsLongitude()
  long: number;

  @IsString()
  make: string;

  @IsNumber()
  @Max(1_000_000)
  @Min(0)
  mileage: number;

  @IsString()
  model: string;

  @IsNumber()
  @Max(1_000_000)
  @Min(0)
  price: number;

  @IsNumber()
  @Max(2_050)
  @Min(1_930)
  year: number;
}
