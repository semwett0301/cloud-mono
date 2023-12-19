import { Body, Controller, Get, Param, Query } from "@nestjs/common";
import { SetRequest, SetResponse, SetSortItem } from "@project/meta";

import { SetsService } from "./sets.service";

@Controller("sets")
export class SetsController {
  constructor(private setsService: SetsService) {
  }

  @Get()
  async getSets(@Query("sort") sort?: SetSortItem,
                @Query("page") page?: number,
                @Query("pageSize") pageSize?: number,
                @Query("lePrice") lePrice?: number,
                @Query("gePrice") gePrice?: number): Promise<SetResponse[]> {
    return await this.setsService.getSets({
      sort,
      page,
      pageSize,
      lePrice,
      gePrice,
    });
  }

  @Get("/:id")
  async getSet(@Param("id") id): Promise<SetResponse> {
    return await this.setsService.getSetById(id);
  }
}
