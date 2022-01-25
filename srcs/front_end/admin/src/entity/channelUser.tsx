import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  ReferenceField,
  ListProps,
  ChipField,
  Edit,
  SimpleForm,
  RadioButtonGroupInput,
} from 'react-admin';

export const ChannelUserList = (props: ListProps) => (
  <List {...props} pagination={false}>
    <Datagrid rowClick="edit">
      <NumberField source="userId" />
      <TextField source="channelId" />
    </Datagrid>
  </List>
);
