import { Body, Controller, Get, Param, UseGuards } from "@nestjs/common";
import { SetRequest, SetResponse } from "@project/meta";

import { JwtAuthGuard } from "../guards";
import { SetsService } from "./sets.service";

@Controller("sets")
@UseGuards(JwtAuthGuard)
export class SetsController {
  constructor(private setsService: SetsService) {}

  @Get()
  async getSets(@Body() params: SetRequest): Promise<SetResponse[]> {
    return await this.setsService.getSets(params);
  }

  @Get("/:id")
  async getSet(@Param("id") id): Promise<SetResponse> {
    return await this.setsService.getSetById(id);
  }
}
