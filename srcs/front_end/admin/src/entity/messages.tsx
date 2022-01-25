import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  ReferenceField,
  ListProps,
} from 'react-admin';

export const MessageList = (props: ListProps) => (
  <List {...props} pagination={false}>
    <Datagrid rowClick="edit">
      <ReferenceField label="User" source="userId" reference="User">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="textMessage" />
      <NumberField source="channelId" />
      <DateField source="created_at" />
      {/* <TextField source="id" /> */}
      {/* <TextField source="phone" />
            <UrlField source="website" />
            <TextField source="company.name" /> */}
    </Datagrid>
  </List>
);
