import React, {KeyboardEvent, useRef, useState} from 'react';
import {OptionButton} from '../components/common/Button';
import BackBoard from '../components/common/BackBoard';
import Body, {
  BackboardBoxInnerLayout,
  BackboardBoxLayout,
} from '../components/common/Body';
import {OptionBox} from '../components/friend/UserProfile';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

export default function TwoFactorAuthPage(): JSX.Element {
  const history = useHistory();
  const number = useRef(0);
  const [inputs, setInputs] = useState({
    value: '',
    otp0: '',
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    otp5: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token =
      inputs.otp0 +
      inputs.otp1 +
      inputs.otp2 +
      inputs.otp3 +
      inputs.otp4 +
      inputs.otp5;
    const res = await axios.post(
      'http://api.ts.io:30000/auth/login/2fa',
      {
        token,
      },
      {
        withCredentials: true,
      },
    );
    if (res.data === true) {
      history.push('/auth');
    } else {
      alert('실패');
    }
  };

  const onFocus = (e: React.FocusEvent) => {
    const name = (e.target as HTMLInputElement).name;
    number.current = Number(name[3]);
  };

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Delete' && e.key !== 'Backspace') {
      number.current = number.current < 5 ? number.current + 1 : number.current;
      const nextInput: HTMLInputElement | null = document.querySelector(
        `input[name=otp${number.current}]`,
      );
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const onClickReset = () => {
    setInputs({
      value: '',
      otp0: '',
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
    });
  };

  return (
    <Body>
      <BackboardBoxLayout>
        <BackboardBoxInnerLayout>
          <BackBoard>
            <form
              onSubmit={onSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px',
              }}
            >
              <h1>OTP 입력</h1>
              <div style={{display: 'flex'}}>
                <input
                  name="otp0"
                  autoComplete="off"
                  value={inputs.otp0}
                  onChange={onChange}
                  maxLength={1}
                  onKeyUp={onKeyUp}
                  style={{width: '50%'}}
                  onFocus={onFocus}
                />
                <span>-</span>
                <input
                  name="otp1"
                  autoComplete="off"
                  value={inputs.otp1}
                  onChange={onChange}
                  maxLength={1}
                  onKeyUp={onKeyUp}
                  style={{width: '50%'}}
                  onFocus={onFocus}
                />
                <span>-</span>
                <input
                  name="otp2"
                  autoComplete="off"
                  value={inputs.otp2}
                  onChange={onChange}
                  maxLength={1}
                  onKeyUp={onKeyUp}
                  style={{width: '50%'}}
                  onFocus={onFocus}
                />
                <span>-</span>
                <input
                  name="otp3"
                  autoComplete="off"
                  value={inputs.otp3}
                  onChange={onChange}
                  maxLength={1}
                  onKeyUp={onKeyUp}
                  style={{width: '50%'}}
                  onFocus={onFocus}
                />
                <span>-</span>
                <input
                  name="otp4"
                  autoComplete="off"
                  value={inputs.otp4}
                  onChange={onChange}
                  maxLength={1}
                  onKeyUp={onKeyUp}
                  style={{width: '50%'}}
                  onFocus={onFocus}
                />
                <span>-</span>
                <input
                  name="otp5"
                  autoComplete="off"
                  value={inputs.otp5}
                  onChange={onChange}
                  maxLength={1}
                  onKeyUp={onKeyUp}
                  style={{width: '50%'}}
                  onFocus={onFocus}
                />
              </div>
              <OptionBox>
                <OptionButton type="submit">submit</OptionButton>
                <OptionButton type="button" onClick={onClickReset}>
                  reset
                </OptionButton>
              </OptionBox>
            </form>
          </BackBoard>
        </BackboardBoxInnerLayout>
      </BackboardBoxLayout>
    </Body>
  );
}
