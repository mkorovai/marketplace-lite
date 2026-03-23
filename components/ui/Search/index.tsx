// base
import React from 'react';

// libs
import _ from 'lodash';

// react-native
import {
  StyleSheet,
  TextInput,
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
} from 'react-native';

// types
type Props = {
  search: string;
  placeholder: string;
  setSearch: (search: string) => void;
};

const Search = ({ search, placeholder, setSearch }: Props) => {
  const changeSearch = (value: string) => setSearch(_.trimStart(value));

  return (
    <TextInput
      style={styles.search}
      onChangeText={changeSearch}
      value={search}
      placeholder={placeholder}
    />
  );
};

export default Search;

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  search: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F3F3F5',
  },
});
