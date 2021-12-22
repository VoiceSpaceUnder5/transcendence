const SELECT_CHATMENU = 'chatting/SELECT_CHATMENU' as const;
const JOIN_CHANNEL = 'chatting/JOIN_CHANNEL' as const;
const EXIT_CHANNEL = 'chatting/EXIT_CHANNEL' as const;

// eslint-disable-next-line
export const selectChatMenu = (menuIdx: number) => ({
  type: SELECT_CHATMENU,
  menuIdx,
});
// eslint-disable-next-line
export const joinChannel = (channelId: number) => {
  console.log(`channel ID:${channelId}에 입장 시도`);
  return {type: JOIN_CHANNEL, menuIdx: 4, channelId};
};

// eslint-disable-next-line
export const exitChannel = () => ({
  type: EXIT_CHANNEL,
});

interface StateTypes {
  menuIdx: number;
  channelId?: number;
}

const initialState: StateTypes = {
  menuIdx: 1,
  channelId: undefined,
};

type ChattingAction =
  | ReturnType<typeof selectChatMenu>
  | ReturnType<typeof joinChannel>
  | ReturnType<typeof exitChannel>;

// eslint-disable-next-line
export default function chatting(state = initialState, action: ChattingAction) {
  switch (action.type) {
    case SELECT_CHATMENU:
      return {
        ...state,
        menuIdx: action.menuIdx,
      };
    case JOIN_CHANNEL:
      return {
        ...state,
        menuIdx: action.menuIdx,
        channelId: action.channelId,
      };
    default:
      return state;
  }
}
