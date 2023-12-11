import { Controller, Get, Param } from "@nestjs/common";

import { SetResponseDto } from "./dto";
import { SetsService } from "./sets.service";

@Controller("sets")
export class SetsController {
  constructor(private setsService: SetsService) {}

  @Get()
  async getSets(): Promise<SetResponseDto[]> {
    return await this.setsService.getSets();
  }

  @Get("/:id")
  async getSet(@Param("id") id): Promise<SetResponseDto> {
    return await this.setsService.getSetById(id);
  }
}
