import {gql} from '@apollo/client';

export const GET_RECORDS = gql`
  query getRecords($input: Int!) {
    getUserById(id: $input) {
      records {
        id
        leftUserId
        rightUserId
        resultId
      }
    }
  }
`;

export const GET_ACHIEVMENT = gql`
  query getAchievementsByUserId($input: Float!) {
    getAchievementsByUserId(userId: $input) {
      type {
        label_korean
      }
    }
  }
`;
