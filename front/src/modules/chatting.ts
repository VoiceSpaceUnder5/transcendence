const SELECT_MENU = 'chatting/SELECT_MENU' as const;
const JOIN = 'chatting/JOIN' as const;
const AFTER_JOIN = 'chatting/AFTER_JOIN' as const;
const EXIT = 'chatting/EXIT' as const;

// eslint-disable-next-line
export const selectMenu = (menuIdx: number) => ({
  type: SELECT_MENU,
  menuIdx,
});
// eslint-disable-next-line
export const join = (channelId: number, isPrivate: boolean) => {
  const privateRoom = isPrivate ? '비공개방' : '공개방';
  console.log(`channel ID:${channelId}(${privateRoom}) 입장 시도`);
  return {type: JOIN, menuIdx: 4, channelId, isPrivate};
};

// eslint-disable-next-line
export const afterJoin = (channelId: number) => {
  console.log(`channel ID:${channelId}에 입장 성공!`);
  return {type: AFTER_JOIN, menuIdx: 5, channelId};
};

// eslint-disable-next-line
export const exit = () => ({
  type: EXIT,
});

interface StateTypes {
  menuIdx: number;
  channelId?: number;
  isPrivate?: boolean;
}

const initialState: StateTypes = {
  menuIdx: 1,
};

type ChattingAction =
  | ReturnType<typeof selectMenu>
  | ReturnType<typeof join>
  | ReturnType<typeof afterJoin>
  | ReturnType<typeof exit>;

// eslint-disable-next-line
export default function chatting(state = initialState, action: ChattingAction) {
  switch (action.type) {
    case SELECT_MENU:
      return {
        menuIdx: action.menuIdx,
        channelId: undefined,
        isPrivate: undefined,
      };
    case JOIN:
      return {
        ...state,
        menuIdx: action.menuIdx,
        channelId: action.channelId,
        isPrivate: action.isPrivate,
      };
    case AFTER_JOIN:
      return {
        ...state,
        menuIdx: action.menuIdx,
        channelId: action.channelId,
        isPrivate: undefined,
      };
    default:
      return state;
  }
}
