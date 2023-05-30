'use client';
import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { InitialState } from './stateTypes';
import { AppActions } from './actionsTypes';
import AppReducer from './reducer';
import initialState from './state';

interface AppContextType {
  state: InitialState;
  dispatch: React.Dispatch<AppActions>;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const store = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider, useAppContext };
