import React from 'react';
import styled from 'styled-components';

const MatchRecordInfoStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px 44px;

  position: static;
  width: 210px;
  height: 56px;
  left: 89px;
  top: 13px;

  /* fill/gray */

  background: #f0f0f0;
  border-radius: 10px;

  /* Inside Auto Layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 15px;
`;

interface MatchRecordInfo {
  recordInfo: string;
}
export default function MatchRecordInfo({recordInfo}: MatchRecordInfo) {
  return <MatchRecordInfoStyle>{recordInfo}</MatchRecordInfoStyle>;
}
