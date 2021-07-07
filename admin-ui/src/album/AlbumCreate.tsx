import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";
import { ArtistTitle } from "../artist/ArtistTitle";

export const AlbumCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput source="artist.id" reference="Artist" label="artist">
          <SelectInput optionText={ArtistTitle} />
        </ReferenceInput>
        <TextInput label="picture" source="picture" />
        <TextInput label="title" source="title" />
      </SimpleForm>
    </Create>
  );
};
