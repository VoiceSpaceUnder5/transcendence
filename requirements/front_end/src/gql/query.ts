import {gql} from '@apollo/client';

export const GET_RECORDS = gql`
  query getRecords {
    getRecords {
      leftUserId
      rightUserId
      result {
        label_korean
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
