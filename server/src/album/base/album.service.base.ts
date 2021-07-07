import { PrismaService } from "nestjs-prisma";
import { Prisma, Album, Song, Artist } from "@prisma/client";

export class AlbumServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.AlbumFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.AlbumFindManyArgs>
  ): Promise<number> {
    return this.prisma.album.count(args);
  }

  async findMany<T extends Prisma.AlbumFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.AlbumFindManyArgs>
  ): Promise<Album[]> {
    return this.prisma.album.findMany(args);
  }
  async findOne<T extends Prisma.AlbumFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.AlbumFindUniqueArgs>
  ): Promise<Album | null> {
    return this.prisma.album.findUnique(args);
  }
  async create<T extends Prisma.AlbumCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.AlbumCreateArgs>
  ): Promise<Album> {
    return this.prisma.album.create<T>(args);
  }
  async update<T extends Prisma.AlbumUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.AlbumUpdateArgs>
  ): Promise<Album> {
    return this.prisma.album.update<T>(args);
  }
  async delete<T extends Prisma.AlbumDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.AlbumDeleteArgs>
  ): Promise<Album> {
    return this.prisma.album.delete(args);
  }

  async findSongs(
    parentId: string,
    args: Prisma.SongFindManyArgs
  ): Promise<Song[]> {
    return this.prisma.album
      .findUnique({
        where: { id: parentId },
      })
      .songs(args);
  }

  async getArtist(parentId: string): Promise<Artist | null> {
    return this.prisma.album
      .findUnique({
        where: { id: parentId },
      })
      .artist();
  }
}
