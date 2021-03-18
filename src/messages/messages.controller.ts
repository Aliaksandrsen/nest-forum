import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
} from '@nestjs/common';

import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './messages.entity';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  getAll(): Promise<Message[]> {
    return this.messagesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Message> {
    return this.messagesService.getById(id);
  }

  @Post()
  create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messagesService.create(createMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Message> {
    return this.messagesService.remove(id);
  }

  @Put(':id')
  update(
    @Body() updateMessageDto: UpdateMessageDto,
    @Param('id') id: string,
  ): Promise<Message> {
    return this.messagesService.update(id, updateMessageDto);
  }
}
