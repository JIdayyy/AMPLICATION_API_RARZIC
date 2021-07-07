import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateSongArgs } from "./CreateSongArgs";
import { UpdateSongArgs } from "./UpdateSongArgs";
import { DeleteSongArgs } from "./DeleteSongArgs";
import { SongFindManyArgs } from "./SongFindManyArgs";
import { SongFindUniqueArgs } from "./SongFindUniqueArgs";
import { Song } from "./Song";
import { Album } from "../../album/base/Album";
import { Artist } from "../../artist/base/Artist";
import { Playlist } from "../../playlist/base/Playlist";
import { SongService } from "../song.service";

@graphql.Resolver(() => Song)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class SongResolverBase {
  constructor(
    protected readonly service: SongService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Song",
    action: "read",
    possession: "any",
  })
  async _songsMeta(
    @graphql.Args() args: SongFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Song])
  @nestAccessControl.UseRoles({
    resource: "Song",
    action: "read",
    possession: "any",
  })
  async songs(
    @graphql.Args() args: SongFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Song[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Song",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Song, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Song",
    action: "read",
    possession: "own",
  })
  async song(
    @graphql.Args() args: SongFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Song | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Song",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Song)
  @nestAccessControl.UseRoles({
    resource: "Song",
    action: "create",
    possession: "any",
  })
  async createSong(
    @graphql.Args() args: CreateSongArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Song> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Song",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Song"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        album: {
          connect: args.data.album,
        },

        artist: {
          connect: args.data.artist,
        },

        playlist: args.data.playlist
          ? {
              connect: args.data.playlist,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Song)
  @nestAccessControl.UseRoles({
    resource: "Song",
    action: "update",
    possession: "any",
  })
  async updateSong(
    @graphql.Args() args: UpdateSongArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Song | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Song",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Song"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          album: {
            connect: args.data.album,
          },

          artist: {
            connect: args.data.artist,
          },

          playlist: args.data.playlist
            ? {
                connect: args.data.playlist,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Song)
  @nestAccessControl.UseRoles({
    resource: "Song",
    action: "delete",
    possession: "any",
  })
  async deleteSong(@graphql.Args() args: DeleteSongArgs): Promise<Song | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => Album, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Song",
    action: "read",
    possession: "any",
  })
  async album(
    @graphql.Parent() parent: Song,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Album | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Album",
    });
    const result = await this.service.getAlbum(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Artist, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Song",
    action: "read",
    possession: "any",
  })
  async artist(
    @graphql.Parent() parent: Song,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Artist | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Artist",
    });
    const result = await this.service.getArtist(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Playlist, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Song",
    action: "read",
    possession: "any",
  })
  async playlist(
    @graphql.Parent() parent: Song,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Playlist | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Playlist",
    });
    const result = await this.service.getPlaylist(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
