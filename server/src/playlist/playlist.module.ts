import { Module } from "@nestjs/common";
import { PlaylistModuleBase } from "./base/playlist.module.base";
import { PlaylistService } from "./playlist.service";
import { PlaylistController } from "./playlist.controller";
import { PlaylistResolver } from "./playlist.resolver";

@Module({
  imports: [PlaylistModuleBase],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistResolver],
  exports: [PlaylistService],
})
export class PlaylistModule {}
