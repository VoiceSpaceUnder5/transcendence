// action 타입
const SELECT_MENU = 'chatting/SELECT_MENU' as const;
const JOIN = 'chatting/JOIN' as const;
const AFTER_JOIN = 'chatting/AFTER_JOIN' as const;
const EXIT = 'chatting/EXIT' as const;

// action 생성 함수
// 아래는 action 생성 함수의 return type
type ActionReturnType = {
  type: string;
  menuIdx: number;
  channelId?: number;
  isPrivate?: boolean;
};

export const selectMenu = (menuIdx: number): ActionReturnType => ({
  type: SELECT_MENU,
  menuIdx,
});

export const join = (
  channelId: number,
  isPrivate: boolean,
): ActionReturnType => {
  const privateRoom = isPrivate ? '비공개방' : '공개방';
  console.log(`channel ID:${channelId}(${privateRoom}) 입장 시도`);
  return {type: JOIN, menuIdx: 4, channelId, isPrivate};
};

export const afterJoin = (channelId: number): ActionReturnType => {
  console.log(`channel ID:${channelId}에 입장 성공!`);
  return {type: AFTER_JOIN, menuIdx: 5, channelId};
};

export const exit = (): ActionReturnType => ({
  type: EXIT,
  menuIdx: 1, // 채팅방에서 아예 퇴장 시 1번으로
});

interface StateTypes {
  menuIdx: number;
  channelId?: number;
  isPrivate?: boolean;
}

const initialState: StateTypes = {
  menuIdx: 1,
};

export default function chatting(
  state = initialState,
  action: ActionReturnType,
): StateTypes {
  switch (action.type) {
    case SELECT_MENU:
      return {
        menuIdx: action.menuIdx,
        channelId: undefined,
        isPrivate: undefined,
      };
    case JOIN:
      return {
        menuIdx: action.menuIdx,
        channelId: action.channelId,
        isPrivate: action.isPrivate,
      };
    case AFTER_JOIN:
      return {
        menuIdx: action.menuIdx,
        channelId: action.channelId,
        isPrivate: undefined,
      };
    default:
      return state;
  }
}
