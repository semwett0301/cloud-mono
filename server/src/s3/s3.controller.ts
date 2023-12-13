import { Controller, Get, NotFoundException, Param, Res } from "@nestjs/common";

import { S3Service } from "./s3.service";

@Controller("static")
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get("/:id")
  async serveStaticFile(@Param("id") id, @Res() response) {
    try {
      const s3Object = await this.s3Service.getObject(id);
      response.header("Content-Type", s3Object.ContentType);
      response.send(s3Object.Body);
    } catch (e) {
      throw new NotFoundException("Файл не найден");
    }
  }
}
