import { PrismaService } from "nestjs-prisma";
import { Prisma, Artist, Album, Song } from "@prisma/client";

export class ArtistServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ArtistFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ArtistFindManyArgs>
  ): Promise<number> {
    return this.prisma.artist.count(args);
  }

  async findMany<T extends Prisma.ArtistFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ArtistFindManyArgs>
  ): Promise<Artist[]> {
    return this.prisma.artist.findMany(args);
  }
  async findOne<T extends Prisma.ArtistFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ArtistFindUniqueArgs>
  ): Promise<Artist | null> {
    return this.prisma.artist.findUnique(args);
  }
  async create<T extends Prisma.ArtistCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ArtistCreateArgs>
  ): Promise<Artist> {
    return this.prisma.artist.create<T>(args);
  }
  async update<T extends Prisma.ArtistUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ArtistUpdateArgs>
  ): Promise<Artist> {
    return this.prisma.artist.update<T>(args);
  }
  async delete<T extends Prisma.ArtistDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ArtistDeleteArgs>
  ): Promise<Artist> {
    return this.prisma.artist.delete(args);
  }

  async findAlbums(
    parentId: string,
    args: Prisma.AlbumFindManyArgs
  ): Promise<Album[]> {
    return this.prisma.artist
      .findUnique({
        where: { id: parentId },
      })
      .albums(args);
  }

  async findSongs(
    parentId: string,
    args: Prisma.SongFindManyArgs
  ): Promise<Song[]> {
    return this.prisma.artist
      .findUnique({
        where: { id: parentId },
      })
      .songs(args);
  }
}
