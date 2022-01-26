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

export const ChannelList = (props: ListProps) => (
  <List {...props} pagination={false}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <ChipField source="id" />
      <ReferenceField label="Type" source="typeId" reference="Code">
        <ChipField source="label_korean" />
      </ReferenceField>
    </Datagrid>
  </List>
);
