import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PlaylistService } from "./playlist.service";
import { PlaylistControllerBase } from "./base/playlist.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("playlists")
@common.Controller("playlists")
export class PlaylistController extends PlaylistControllerBase {
  constructor(
    protected readonly service: PlaylistService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
