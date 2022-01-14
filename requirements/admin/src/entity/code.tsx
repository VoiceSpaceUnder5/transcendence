import React from 'react';
import {List, Datagrid, TextField, ChipField, ListProps} from 'react-admin';

export const CodeList = (props: ListProps) => (
  <List {...props} pagination={false}>
    <Datagrid rowClick="edit">
      <ChipField source="group" />
      <TextField source="id" />
      <TextField source="label_korean" />
      <TextField source="label_english" />
    </Datagrid>
  </List>
);
