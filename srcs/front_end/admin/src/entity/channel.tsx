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
      <ReferenceField
        label="Users"
        source="ChannelUser"
        reference="ChannelUser"
      >
        <ChipField source="userId" />
      </ReferenceField>
      <ChipField source="typeId" />
    </Datagrid>
  </List>
);

export const ChannelEdit = (props: ListProps) => (
  <Edit {...props}>
    <SimpleForm>
      <RadioButtonGroupInput
        source="authorityId"
        choices={[
          {authorityId: 'UA0', name: '사이트 관리자'},
          {authorityId: 'UA1', name: '일반 회원'},
        ]}
        optionValue="authorityId"
      />
    </SimpleForm>
  </Edit>
);
