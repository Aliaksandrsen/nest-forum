import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './orm.conig';
import { SectionModule } from './sections/sections.module';
import { TopicsModule } from './topics/topics.module';
import { SubtopicsModule } from './subtopics/subtopics.module';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    SectionModule,
    TopicsModule,
    SubtopicsModule,
    UsersModule,
    MessagesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
