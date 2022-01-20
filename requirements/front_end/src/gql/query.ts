import {gql} from '@apollo/client';

export const GET_RECORDS = gql`
  query getRecords($input: Int!) {
    getUserById(id: $input) {
      records {
        id
        leftUserId
        rightUserId
        resultId
        modeId #보통인지 어려움인지
        typeId #래더인지 일반인지
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
