import React from 'react';
// import Input from '../common/Input';
import TitleDiv from '../common/TitleDiv';
import BackBoard from '../common/BackBoard';
import PageContentStyle from '../common/Body';

export default function Profile() {
  return (
    <BackBoard>
      <TitleDiv>프로필</TitleDiv>
      <PageContentStyle>
        <img src="../../../public.Profile.png" />
      </PageContentStyle>
    </BackBoard>
  );
}
