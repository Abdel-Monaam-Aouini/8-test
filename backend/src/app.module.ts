import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { ItunesSearchController } from './controllers/itunes-search.controller';
import { ItunesSearchService } from './services/itunes-search.service';
import { ItunesSearchResult } from './entities/itunes-search-result.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'itunes_search',
      entities: [ItunesSearchResult],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: true,
    }),
    TypeOrmModule.forFeature([ItunesSearchResult]),
    HttpModule,
  ],
  controllers: [AppController, ItunesSearchController],
  providers: [ItunesSearchService],
})
export class AppModule {}
