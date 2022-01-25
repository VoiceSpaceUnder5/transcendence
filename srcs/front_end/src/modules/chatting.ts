// action.type
const TOGGLE_CHAT = 'chatting/OPEN' as const;
const SELECT_MENU = 'chatting/SELECT_MENU' as const;
const CREATE_CHANNEL = 'chatting/CREATE_CHANNEL' as const;
const JOIN_CHANNEL = 'chatting/JOIN_CHANNEL' as const;
const AFTER_JOIN = 'chatting/AFTER_JOIN' as const;
const UPDATE_RELATION = 'chatting/RELATION_UPDATE' as const;
const EXIT = 'chatting/EXIT' as const;

// action 생성 함수
// 아래는 action 생성 함수의 return type
type ActionReturnType = {
  type: string;
  isOpen: boolean;
  menuIdx: number;
  channelId?: string;
  isPrivate?: boolean;
  isUpdated?: boolean;
  role?: string;
};

// 채팅 인터페이스를 켜거나 끔
export const toggleChat = (isOpen: boolean): ActionReturnType => ({
  isOpen: !isOpen,
  type: TOGGLE_CHAT,
  menuIdx: 1,
});

// 채팅 메뉴 선택(친구목록, 참여중, 채널검색, 채널생성)
export const selectMenu = (menuIdx: number): ActionReturnType => ({
  isOpen: true,
  type: SELECT_MENU,
  menuIdx,
});

// 채널을 만듦
export const createChannel = (): ActionReturnType => ({
  isOpen: true,
  type: CREATE_CHANNEL,
  menuIdx: 4,
});

export const joinChannel = (
  channelId: string,
  isPrivate: boolean,
): ActionReturnType => {
  // const privateRoom = isPrivate ? '비공개방' : '공개방';
  // console.log(`channel ID:${channelId}(${privateRoom}) 입장 시도`);
  return {isOpen: true, type: JOIN_CHANNEL, menuIdx: 4, channelId, isPrivate};
};

export const afterJoin = (channelId: string): ActionReturnType => {
  console.log(`channel ID:${channelId}에 입장 성공!`);
  return {isOpen: true, type: AFTER_JOIN, menuIdx: 5, channelId};
};

export const updateRelation = (): ActionReturnType => ({
  isOpen: true,
  type: UPDATE_RELATION,
  menuIdx: 0,
  isUpdated: true,
});

export const exit = (): ActionReturnType => ({
  isOpen: true,
  type: EXIT,
  menuIdx: 1, // 채팅방에서 아예 퇴장 시 1번으로
});

interface StateTypes {
  isOpen: boolean;
  menuIdx: number;
  channelId?: string;
  isPrivate?: boolean;
  isUpdated?: boolean;
  role?: string;
}

const initialState: StateTypes = {
  isOpen: false,
  menuIdx: 1,
};

// 리듀서
// dispatch를 통해 보낸 액션을 상태에 반영
export default function chatting(
  state = initialState,
  action: ActionReturnType,
): StateTypes {
  switch (action.type) {
    case TOGGLE_CHAT:
      return {
        isOpen: action.isOpen,
        menuIdx: action.menuIdx,
        role: undefined,
      };
    case SELECT_MENU:
      return {
        ...state,
        menuIdx: action.menuIdx,
        channelId: undefined,
        isPrivate: undefined,
        role: undefined,
      };
    case CREATE_CHANNEL:
      return {
        ...state,
        isOpen: action.isOpen,
      };
    case JOIN_CHANNEL:
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
        role: action.role,
      };
    case UPDATE_RELATION:
      return {
        ...state,
        isUpdated: true,
      };
    default:
      return state;
  }
}
