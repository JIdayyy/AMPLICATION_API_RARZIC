import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ArtistService } from "./artist.service";
import { ArtistControllerBase } from "./base/artist.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("artists")
@common.Controller("artists")
export class ArtistController extends ArtistControllerBase {
  constructor(
    protected readonly service: ArtistService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
