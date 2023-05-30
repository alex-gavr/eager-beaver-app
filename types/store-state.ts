export interface LoadingAndError {
    loading: boolean | null;
    error: boolean;
}

export interface IButtonState {
    submitIntention: boolean;
}

export interface ITelegram extends LoadingAndError {
    submitSuccess: boolean | null;
    submitError: boolean | null;
    locationSubmitted: boolean | null;
    enrolledToFutureEvent: boolean | null;
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