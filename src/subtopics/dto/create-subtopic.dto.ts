import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubtopicDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  topicId: number;
}
