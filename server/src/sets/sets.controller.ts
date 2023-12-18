import { Body, Controller, Get, Param } from '@nestjs/common';
import { SetRequest, SetResponse } from '@project/meta';

import { SetsService } from './sets.service';

@Controller('sets')
export class SetsController {
  constructor(private setsService: SetsService) {}

  @Get()
  async getSets(@Body() params: SetRequest): Promise<SetResponse[]> {
    return await this.setsService.getSets(params);
  }

  @Get('/:id')
  async getSet(@Param('id') id): Promise<SetResponse> {
    return await this.setsService.getSetById(id);
  }
}
