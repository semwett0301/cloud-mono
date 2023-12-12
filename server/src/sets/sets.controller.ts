import { Body, Controller, Get, Param } from "@nestjs/common";

import { SetResponseDto, SetsRequestDto } from "./dto";
import { SetsService } from "./sets.service";

@Controller("sets")
export class SetsController {
  constructor(private setsService: SetsService) {}

  @Get()
  async getSets(@Body() params: SetsRequestDto): Promise<SetResponseDto[]> {
    return await this.setsService.getSets(params);
  }

  @Get("/:id")
  async getSet(@Param("id") id): Promise<SetResponseDto> {
    return await this.setsService.getSetById(id);
  }
}
