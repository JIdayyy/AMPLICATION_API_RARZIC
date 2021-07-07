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
import { SongService } from "../song.service";
import { SongCreateInput } from "./SongCreateInput";
import { SongWhereInput } from "./SongWhereInput";
import { SongWhereUniqueInput } from "./SongWhereUniqueInput";
import { SongFindManyArgs } from "./SongFindManyArgs";
import { SongUpdateInput } from "./SongUpdateInput";
import { Song } from "./Song";

export class SongControllerBase {
  constructor(
    protected readonly service: SongService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Song",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Song })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: SongCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Song> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Song",
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
        `providing the properties: ${properties} on ${"Song"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        album: {
          connect: data.album,
        },

        artist: {
          connect: data.artist,
        },

        playlist: data.playlist
          ? {
              connect: data.playlist,
            }
          : undefined,
      },
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
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Song",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Song] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SongFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Song[]> {
    const args = plainToClass(SongFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Song",
    });
    const results = await this.service.findMany({
      ...args,
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
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Song",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Song })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: SongWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Song | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Song",
    });
    const result = await this.service.findOne({
      where: params,
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
    resource: "Song",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Song })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: SongWhereUniqueInput,
    @common.Body()
    data: SongUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Song | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Song",
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
        `providing the properties: ${properties} on ${"Song"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          album: {
            connect: data.album,
          },

          artist: {
            connect: data.artist,
          },

          playlist: data.playlist
            ? {
                connect: data.playlist,
              }
            : undefined,
        },
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
    resource: "Song",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Song })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: SongWhereUniqueInput
  ): Promise<Song | null> {
    try {
      return await this.service.delete({
        where: params,
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
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
