import { ActionsType, AppActions } from './actionsTypes';
import { InitialState } from './stateTypes';

const AppReducer = (state: InitialState, action: AppActions): InitialState => {
  const { type } = action;

  switch (type) {
    case ActionsType.setError: {
      const { payload } = action;
      return {
        ...state,
        error: payload,
      };
    }
    case ActionsType.setFooterVisibility: {
      const { payload } = action;
      return {
        ...state,
        footerVisible: payload,
      };
    }
    case ActionsType.setHeaderVisibility: {
      const { payload } = action;
      return {
        ...state,
        headerVisible: payload,
      };
    }
    case ActionsType.setLoaderVisibility: {
      const { payload } = action;
      return {
        ...state,
        loaderVisible: payload,
      };
    }
    case ActionsType.setEventUpdated: {
      const { payload } = action;
      return {
        ...state,
        eventUpdated: payload,
      };
    }

    default:
      return state;
  }
};

export default AppReducer;
