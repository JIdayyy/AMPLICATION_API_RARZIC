import { PrismaService } from "nestjs-prisma";
import { Prisma, Song, Album, Artist, Playlist } from "@prisma/client";

export class SongServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.SongFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SongFindManyArgs>
  ): Promise<number> {
    return this.prisma.song.count(args);
  }

  async findMany<T extends Prisma.SongFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SongFindManyArgs>
  ): Promise<Song[]> {
    return this.prisma.song.findMany(args);
  }
  async findOne<T extends Prisma.SongFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.SongFindUniqueArgs>
  ): Promise<Song | null> {
    return this.prisma.song.findUnique(args);
  }
  async create<T extends Prisma.SongCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SongCreateArgs>
  ): Promise<Song> {
    return this.prisma.song.create<T>(args);
  }
  async update<T extends Prisma.SongUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SongUpdateArgs>
  ): Promise<Song> {
    return this.prisma.song.update<T>(args);
  }
  async delete<T extends Prisma.SongDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.SongDeleteArgs>
  ): Promise<Song> {
    return this.prisma.song.delete(args);
  }

  async getAlbum(parentId: string): Promise<Album | null> {
    return this.prisma.song
      .findUnique({
        where: { id: parentId },
      })
      .album();
  }

  async getArtist(parentId: string): Promise<Artist | null> {
    return this.prisma.song
      .findUnique({
        where: { id: parentId },
      })
      .artist();
  }

  async getPlaylist(parentId: string): Promise<Playlist | null> {
    return this.prisma.song
      .findUnique({
        where: { id: parentId },
      })
      .playlist();
  }
}
