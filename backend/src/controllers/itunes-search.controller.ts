import { Controller, Get, Query } from '@nestjs/common';
import { ItunesSearchService } from '../services/itunes-search.service';
import { SearchItunesDto } from '../dto/search-itunes.dto';

@Controller('itunes')
export class ItunesSearchController {
  constructor(private readonly itunesSearchService: ItunesSearchService) {}

  @Get('search')
  async search(@Query() searchDto: SearchItunesDto) {
    const results = await this.itunesSearchService.searchAndStore(searchDto);

    return {
      success: true,
      data: results,
      count: results.length,
    };
  }
}
