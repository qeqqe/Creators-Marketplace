import { IsString, IsNumber, ValidateNested, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

class GoogleConfig {
  @IsString()
  @IsUrl()
  callbackURL: string;

  @IsString()
  clientId: string;

  @IsString()
  clientSecret: string;
}

class DatabaseConfig {
  @IsString()
  url: string;
}

export class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @ValidateNested()
  @Type(() => GoogleConfig)
  google: GoogleConfig;

  @ValidateNested()
  @Type(() => DatabaseConfig)
  database: DatabaseConfig;
}
