const START_GAME = 'game/START_GAME' as const;
const EXIT_GAME = 'game/EXIT_GAME' as const;
const MODE_UPDATE = 'game/MODE_UPDATE' as const;

type ActionReturnType1 = {
  type: string;
  isGameStart?: boolean;
  isHardMode?: boolean;
};

export const checkMode = (isCheckedHardMode: boolean): ActionReturnType1 => {
  return {
    type: MODE_UPDATE,
    isHardMode: isCheckedHardMode,
  };
};

export const startGame = (): ActionReturnType1 => ({
  type: START_GAME,
  isGameStart: true,
});

export const exitGame = (): ActionReturnType1 => ({
  type: EXIT_GAME,
  isGameStart: false,
});

interface StateTypes1 {
  isGameStart?: boolean;
  isHardMode: boolean;
}

const initialState1: StateTypes1 = {
  isGameStart: false,
  isHardMode: false,
};

export default function game(
  state = initialState1,
  action: ActionReturnType1,
): StateTypes1 {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        isGameStart: action.isGameStart,
      };
    case MODE_UPDATE:
      return {
        ...state,
        isHardMode: action.isHardMode as boolean,
      };
    case EXIT_GAME:
      return {
        ...state,
        isGameStart: action.isGameStart,
      };
    default:
      return state;
  }
}
