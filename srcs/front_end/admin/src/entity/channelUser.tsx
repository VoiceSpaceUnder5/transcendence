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
  EditButton,
} from 'react-admin';

export const ChannelUserList = (props: ListProps) => (
  <List {...props} pagination={false}>
    <Datagrid rowClick="edit">
      <ReferenceField
        label="ChannelName"
        source="channelId"
        reference="Channel"
      >
        <ChipField source="name" />
      </ReferenceField>
      <ReferenceField label="UserName" source="userId" reference="User">
        <ChipField source="name" />
      </ReferenceField>
      <ReferenceField label="Role" source="roleId" reference="Code">
        <ChipField source="label_korean" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);

export const ChannelUserEdit = (props: ListProps) => (
  <Edit {...props}>
    <SimpleForm>
      <RadioButtonGroupInput
        source="roleId"
        choices={[
          {roleId: 'UR0', name: '소유자'},
          {roleId: 'UR1', name: '관리자'},
          {roleId: 'UR2', name: '참여자'},
          {roleId: 'UR3', name: '차단됨'},
          {roleId: 'UR4 ', name: '음소거됨'},
        ]}
        optionValue="roleId"
      />
    </SimpleForm>
  </Edit>
);
