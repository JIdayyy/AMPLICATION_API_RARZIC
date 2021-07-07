import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type PlaylistWhereInput = {
  description?: StringNullableFilter;
  id?: StringFilter;
  title?: StringFilter;
};
