import React, { createContext, useReducer, useContext } from 'react';
import { nanoid } from 'nanoid';
import { findItemIndexById } from './utils/findItemIndexById';
import { moveItem } from './utils/moveItem';
import { DragItem } from './DragItem';

type Action =
  | {
      type: 'ADD_LIST';
      payload: string;
    }
  | {
      type: 'ADD_TASK';
      payload: {
        text: string;
        listId: string;
      };
    }
  | {
      type: 'MOVE_LIST';
      payload: {
        dragIndex: number;
        hoverIndex: number;
      };
    }
  | {
      type: 'SET_DRAGGED_ITEM';
      payload: DragItem | undefined;
    };

interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

interface Task {
  id: string;
  text: string;
}

interface List {
  id: string;
  text: string;
  tasks: Task[];
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_LIST': {
      //reducer logic here
      return {
        ...state,
        lists: [...state.lists, { id: nanoid(), text: action.payload, tasks: [] }],
      };
    }
    case 'ADD_TASK': {
      // reducer logic here
      const targetLaneIndex = findItemIndexById(state.lists, action.payload.listId);
      state.lists[targetLaneIndex].tasks.push({
        id: nanoid(),
        text: action.payload.text,
      });
      return {
        ...state,
      };
    }
    case 'MOVE_LIST': {
      const { dragIndex, hoverIndex } = action.payload;
      state.lists = moveItem(state.lists, dragIndex, hoverIndex);
      return { ...state };
    }
    case "SET_DRAGGED_ITEM": {
      return {...state, draggedItem: action.payload}
    }
    default: {
      return state;
    }
  }
};

export interface AppState {
  lists: List[];
  draggedItem: DragItem | undefined;
}

export const useAppState = () => {
  return useContext(AppStateContext);
};

const appData: AppState = {
  draggedItem: undefined,
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [{ id: 'c0', text: 'Generate app scaffold' }],
    },
    {
      id: '1',
      text: 'In progress',
      tasks: [{ id: 'c1', text: 'learn typescript' }],
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{ id: 'c2', text: 'use typing' }],
    },
  ],
};

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appData);
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>
  );
};
