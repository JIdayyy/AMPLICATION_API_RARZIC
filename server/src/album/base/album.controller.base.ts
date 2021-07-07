import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { AlbumService } from "../album.service";
import { AlbumCreateInput } from "./AlbumCreateInput";
import { AlbumWhereInput } from "./AlbumWhereInput";
import { AlbumWhereUniqueInput } from "./AlbumWhereUniqueInput";
import { AlbumFindManyArgs } from "./AlbumFindManyArgs";
import { AlbumUpdateInput } from "./AlbumUpdateInput";
import { Album } from "./Album";
import { SongWhereInput } from "../../song/base/SongWhereInput";
import { Song } from "../../song/base/Song";

export class AlbumControllerBase {
  constructor(
    protected readonly service: AlbumService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Album",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Album })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: AlbumCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Album> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Album",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Album"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        artist: {
          connect: data.artist,
        },
      },
      select: {
        artist: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        picture: true,
        title: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Album",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Album] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => AlbumFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Album[]> {
    const args = plainToClass(AlbumFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Album",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        artist: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        picture: true,
        title: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Album",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Album })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: AlbumWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Album | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Album",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        artist: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        picture: true,
        title: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Album",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Album })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: AlbumWhereUniqueInput,
    @common.Body()
    data: AlbumUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Album | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Album",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Album"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          artist: {
            connect: data.artist,
          },
        },
        select: {
          artist: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,
          picture: true,
          title: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Album",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Album })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: AlbumWhereUniqueInput
  ): Promise<Album | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          artist: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,
          picture: true,
          title: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id/songs")
  @nestAccessControl.UseRoles({
    resource: "Album",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => SongWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManySongs(
    @common.Req() request: Request,
    @common.Param() params: AlbumWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Song[]> {
    const query: SongWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Song",
    });
    const results = await this.service.findSongs(params.id, {
      where: query,
      select: {
        album: {
          select: {
            id: true,
          },
        },

        artist: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        duration: true,
        id: true,

        playlist: {
          select: {
            id: true,
          },
        },

        s3Link: true,
        title: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/songs")
  @nestAccessControl.UseRoles({
    resource: "Album",
    action: "update",
    possession: "any",
  })
  async createSongs(
    @common.Param() params: AlbumWhereUniqueInput,
    @common.Body() body: AlbumWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      songs: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Album",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Album"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/songs")
  @nestAccessControl.UseRoles({
    resource: "Album",
    action: "update",
    possession: "any",
  })
  async updateSongs(
    @common.Param() params: AlbumWhereUniqueInput,
    @common.Body() body: AlbumWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      songs: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Album",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Album"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id/songs")
  @nestAccessControl.UseRoles({
    resource: "Album",
    action: "update",
    possession: "any",
  })
  async deleteSongs(
    @common.Param() params: AlbumWhereUniqueInput,
    @common.Body() body: AlbumWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      songs: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Album",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Album"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
