const OPEN_CHATBOARD = 'chatting/OPEN_CHATBOARD' as const;
const SELECT_CHATMENU = 'chatting/SELECT_CHATMENU' as const;
const JOIN_CHANNEL = 'chatting/JOIN_CHANNEL' as const;
const AFTER_JOIN = 'chatting/AFTER_JOIN' as const;
const EXIT_CHANNEL = 'chatting/EXIT_CHANNEL' as const;

// eslint-disable-next-line
export const openChatBoard = (visible: boolean) => ({
  type: OPEN_CHATBOARD,
  visible,
});
// eslint-disable-next-line
export const selectChatMenu = (menuIdx: number) => ({
  type: SELECT_CHATMENU,
  menuIdx,
});
// eslint-disable-next-line
export const joinChannel = (channelId: number) => ({
  type: JOIN_CHANNEL,
  channelId,
});
// eslint-disable-next-line
export const afterJoin = (
  channelId: number | undefined,
  isInChannel: boolean,
) => ({
  type: AFTER_JOIN,
  channelId,
  isInChannel,
});

// eslint-disable-next-line
export const exitChannel = () => ({
  type: EXIT_CHANNEL,
});

interface StateTypes {
  menuIdx: number;
  visible: boolean;
  channelId?: number;
}

const initialState: StateTypes = {
  menuIdx: 1,
  visible: false,
  channelId: undefined,
};

type ChattingAction =
  | ReturnType<typeof openChatBoard>
  | ReturnType<typeof selectChatMenu>
  | ReturnType<typeof joinChannel>
  | ReturnType<typeof afterJoin>
  | ReturnType<typeof exitChannel>;

// eslint-disable-next-line
export default function chatting(state = initialState, action: ChattingAction) {
  switch (action.type) {
    case OPEN_CHATBOARD:
      return {
        ...state,
        visible: !action.visible,
      };
    case SELECT_CHATMENU:
      return {
        ...state,
        menuIdx: action.menuIdx,
      };
    case JOIN_CHANNEL:
      return {
        ...state,
        channelId: action.channelId,
      };
    default:
      return state;
  }
}
