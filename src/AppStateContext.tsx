import React,{createContext, useReducer, useContext} from "react"


interface AppStateContextProps {
    state: AppState
}

interface Task {
    id: string
    text: string
}

interface List {
    id: string
    text: string
    tasks: Task[]
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

export interface AppState {
    lists: List[]
}

export const useAppState = () => {
    return useContext(AppStateContext)
}

const appData: AppState = {
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }],
    },
    {
      id: "1",
      text: "In progress",
      tasks: [{ id: "c1", text: "learn typescript" }],
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c2", text: "use typing" }],
    },
  ],
};

export const AppStateProvider = ({children}: React.PropsWithChildren<{}>) => {
    return <AppStateContext.Provider value={{state: appData}}>
        {children}
    </AppStateContext.Provider>
}