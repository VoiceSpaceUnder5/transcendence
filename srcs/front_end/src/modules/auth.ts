// action.type
const ON_LOGIN = 'logint/LOGIN' as const;
const LOGIN_SUCESS = 'login/LOGIN_SUCESS' as const;
const LOGIN_FAIL = 'login/LOGIN_FAIL' as const;
const LOGOUT = 'login/LOGOUT' as const;

type ActionReturnType = {
  type: string;
  isLogin: boolean;
  id?: number;
  name?: string;
  email?: string;
  imagePath?: string;
};

export const onLogin = (): ActionReturnType => ({
  type: ON_LOGIN,
  isLogin: false,
});

export const loginSuccess = (
  id: number,
  name: string,
  email: string,
  imagePath: string,
): ActionReturnType => ({
  type: LOGIN_SUCESS,
  isLogin: true,
  id,
  name,
  email,
  imagePath,
});

export const loginFail = (): ActionReturnType => ({
  type: LOGIN_FAIL,
  isLogin: false,
});

export const logOut = (): ActionReturnType => ({
  type: LOGOUT,
  isLogin: false,
});

interface StateTypes {
  isLogin: boolean;
  id?: number;
  name?: string;
  email?: string;
  imagePath?: string;
}

const initialState: StateTypes = {
  isLogin: false,
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
        id: action.id,
        name: action.name,
        email: action.email,
        imagePath: action.imagePath,
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
