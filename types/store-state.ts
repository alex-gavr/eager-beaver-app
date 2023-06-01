export interface LoadingAndError {
    loading: boolean | null;
    error: boolean;
}

export interface IButtonState {
    submitIntention: boolean;
}

export interface INavigationState{
    footerVisible: boolean;
    headerVisible: boolean;
}
export interface IError {
    error: boolean;
}
export interface IHomeLoader {
    showLoader: boolean;
}