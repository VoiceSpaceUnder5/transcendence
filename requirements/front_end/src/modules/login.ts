// action.type
const ON_LOGIN = 'logint/LOGIN' as const;
const LOGIN_SUCESS = 'login/LOGIN_SUCESS' as const;
const LOGIN_FAIL = 'login/LOGIN_FAIL' as const;
const LOGOUT = 'login/LOGOUT' as const;

enum LoginStep {
  LOGOUT,
  ING,
  SUCCESS,
  FAIL,
}

type ActionReturnType = {
  type: string;
  isLogin: number;
};

export const onLogin = (): ActionReturnType => ({
  type: ON_LOGIN,
  isLogin: LoginStep.ING,
});

export const loginSuccess = (): ActionReturnType => ({
  type: LOGIN_SUCESS,
  isLogin: LoginStep.SUCCESS,
});

export const loginFail = (): ActionReturnType => ({
  type: LOGIN_FAIL,
  isLogin: LoginStep.FAIL,
});

export const logOut = (): ActionReturnType => ({
  type: LOGOUT,
  isLogin: LoginStep.FAIL,
});

interface StateTypes {
  isLogin: number;
}

const initialState: StateTypes = {
  isLogin: LoginStep.LOGOUT,
};

// 리듀서
export default function login(
  state = initialState,
  action: ActionReturnType,
): StateTypes {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        isLogin: action.isLogin,
      };
    case ON_LOGIN:
      return {
        ...state,
        isLogin: action.isLogin,
      };
    case LOGIN_SUCESS:
      return {
        ...state,
        isLogin: action.isLogin,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLogin: action.isLogin,
      };
    default:
      return state;
  }
}
