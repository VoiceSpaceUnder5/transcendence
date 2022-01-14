/* eslint-disable */

const buildFieldList = (resourceName: string): string[] | null => {
  switch (resourceName) {
    case 'User':
      return userFields;
    case 'Code':
      return codeFields;
    case 'Channel':
      return channelFields;
    case 'ChannelUser':
      return channelUserFields;
    case 'Message':
      return messageFields;
    case 'Relation':
      return relationFields;
    default: {
      console.error('Error');
      return null;
    }
  }
};

const userFields = [
  'created_at', // DateTime!
  'updated_at', // DateTime!
  'id', // Int!
  'name', // String!
  'email', // String
  'profile_image', // String
  'profile_image_thumb', // String
  'profile_image_medium', // String
  'description', // String
  // "authority",// Code!
  'authorityId', // String!
  // "channelUsers",// [ChannelUser!]!
  // "messages",// [Message!]!
];

const codeFields = [
  'group', //String!
  'id', // String!
  'label_korean', // String
  'label_english', // String
  'created_at', // DateTime!
  'updated_at', // DateTime!
];

const messageFields = [
  'id', // Int!
  'created_at', // DateTime!
  'updated_at', // DateTime!
  'userId', // Int!
  'channelId', // Int!
  'textMessage', // String!
  // "user",// User!
];

const channelFields = [
  'created_at', // DateTime!
  'updated_at', // DateTime!
  'id', // Int!
  'name', // String!
  'password', // String
  'type', // Code!
  'typeId', // String!
  'channelUsers', // [ChannelUser]!
  'messages', // [Message]!
];

const channelUserFields = [
  'created_at', // DateTime!
  'updated_at', // DateTime!
  'id', // Int!
  'userId', // Int!
  'channelId', // Int!
  'roleId', // String!
  'role', // Code!
];

const relationFields = [
  'created_at', // DateTime!
  'updated_at', // DateTime!
  'user_first_id', // Int!
  'user_second_id', // Int!
  'type', // Code!
  'typeId', // String!
];

export default buildFieldList;
