import { PrismaService } from "nestjs-prisma";
import { Prisma, Playlist, Song } from "@prisma/client";

export class PlaylistServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.PlaylistFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlaylistFindManyArgs>
  ): Promise<number> {
    return this.prisma.playlist.count(args);
  }

  async findMany<T extends Prisma.PlaylistFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlaylistFindManyArgs>
  ): Promise<Playlist[]> {
    return this.prisma.playlist.findMany(args);
  }
  async findOne<T extends Prisma.PlaylistFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlaylistFindUniqueArgs>
  ): Promise<Playlist | null> {
    return this.prisma.playlist.findUnique(args);
  }
  async create<T extends Prisma.PlaylistCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlaylistCreateArgs>
  ): Promise<Playlist> {
    return this.prisma.playlist.create<T>(args);
  }
  async update<T extends Prisma.PlaylistUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlaylistUpdateArgs>
  ): Promise<Playlist> {
    return this.prisma.playlist.update<T>(args);
  }
  async delete<T extends Prisma.PlaylistDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlaylistDeleteArgs>
  ): Promise<Playlist> {
    return this.prisma.playlist.delete(args);
  }

  async findSongs(
    parentId: string,
    args: Prisma.SongFindManyArgs
  ): Promise<Song[]> {
    return this.prisma.playlist
      .findUnique({
        where: { id: parentId },
      })
      .songs(args);
  }
}
