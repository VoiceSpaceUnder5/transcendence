/* eslint-disable */
import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  Edit,
  SimpleForm,
  RadioButtonGroupInput,
  ReferenceField,
  ChipField,
  EditButton,
  ListProps,
} from 'react-admin';

export const UserList = (props: ListProps) => (
  <List {...props} pagination={false}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <ReferenceField label="Authority" source="authorityId" reference="Code">
        <ChipField source="label_korean" />
      </ReferenceField>
      <EmailField source="email" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
      <EditButton />
    </Datagrid>
  </List>
);

export const UserEdit = (props: ListProps) => (
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
