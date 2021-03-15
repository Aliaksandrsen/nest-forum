import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SectionModule } from './sections/sections.module';
import { config } from './orm.conig';

@Module({
  imports: [TypeOrmModule.forRoot(config), SectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
