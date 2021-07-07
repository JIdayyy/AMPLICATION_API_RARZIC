import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  ReferenceField,
  TextField,
  DateField,
  ReferenceManyField,
  Datagrid,
} from "react-admin";

import { ALBUM_TITLE_FIELD } from "./AlbumTitle";
import { ARTIST_TITLE_FIELD } from "../artist/ArtistTitle";
import { PLAYLIST_TITLE_FIELD } from "../playlist/PlaylistTitle";

export const AlbumShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <ReferenceField label="artist" source="artist.id" reference="Artist">
          <TextField source={ARTIST_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <TextField label="picture" source="picture" />
        <TextField label="title" source="title" />
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceManyField reference="Song" target="AlbumId" label="Songs">
          <Datagrid rowClick="show">
            <ReferenceField label="album" source="album.id" reference="Album">
              <TextField source={ALBUM_TITLE_FIELD} />
            </ReferenceField>
            <ReferenceField
              label="artist"
              source="artist.id"
              reference="Artist"
            >
              <TextField source={ARTIST_TITLE_FIELD} />
            </ReferenceField>
            <DateField source="createdAt" label="Created At" />
            <TextField label="duration" source="duration" />
            <TextField label="ID" source="id" />
            <ReferenceField
              label="Playlist"
              source="playlist.id"
              reference="Playlist"
            >
              <TextField source={PLAYLIST_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="S3_link" source="s3Link" />
            <TextField label="title" source="title" />
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
