import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";
import { AlbumTitle } from "../album/AlbumTitle";
import { ArtistTitle } from "../artist/ArtistTitle";
import { PlaylistTitle } from "../playlist/PlaylistTitle";

export const SongCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput source="album.id" reference="Album" label="album">
          <SelectInput optionText={AlbumTitle} />
        </ReferenceInput>
        <ReferenceInput source="artist.id" reference="Artist" label="artist">
          <SelectInput optionText={ArtistTitle} />
        </ReferenceInput>
        <TextInput label="duration" source="duration" />
        <ReferenceInput
          source="playlist.id"
          reference="Playlist"
          label="Playlist"
        >
          <SelectInput optionText={PlaylistTitle} />
        </ReferenceInput>
        <TextInput label="S3_link" source="s3Link" />
        <TextInput label="title" source="title" />
      </SimpleForm>
    </Create>
  );
};
