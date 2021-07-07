import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const ArtistEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="name" source="name" />
        <TextInput label="picture" source="picture" />
      </SimpleForm>
    </Edit>
  );
};
