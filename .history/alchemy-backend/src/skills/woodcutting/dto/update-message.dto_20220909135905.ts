import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './woodcutting.dto';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  id: number;
}
