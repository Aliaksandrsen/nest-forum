import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SectionModule } from './sections/sections.module';

@Module({
  imports: [SectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
