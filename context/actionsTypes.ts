export enum ActionsType {
  setError = 'setError',
  setHeaderVisibility = 'setHeaderVisibility',
  setFooterVisibility = 'setFooterVisibility',
  setLoaderVisibility = 'setLoaderVisibility',
  setEventUpdated = 'setEventUpdated',
}

export interface ISetError {
  type: ActionsType.setError;
  payload: boolean;
}
export interface ISetSurveyLength {
  type: ActionsType.setFooterVisibility;
  payload: boolean;
}
export interface ISetNotificationVisibility {
  type: ActionsType.setHeaderVisibility;
  payload: boolean;
}
export interface ISetLoaderVisibility {
  type: ActionsType.setLoaderVisibility;
  payload: boolean;
}
export interface ISetEventUpdated {
  type: ActionsType.setEventUpdated;
  payload: boolean;
}

export type AppActions =
  | ISetError
  | ISetSurveyLength
  | ISetNotificationVisibility
  | ISetLoaderVisibility
  | ISetEventUpdated;
