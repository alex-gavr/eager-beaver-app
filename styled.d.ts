import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            background: string;
            title: string;
            paragraph: string;
            primaryLight: string;
            primaryMedium: string;
            primaryDark: string;
            secondaryLight: string;
            secondaryDark: string;
            error: string;
            white: string;
            black: string;
            componentBackground: string;
            eventsGradient: string;
            mobileMenu: string;
            modalGradient: string;
            pageTransitionGradient: string;
        };
        fontSize: {
            body: string;
            header: string;
            footer: string;
            button: string;
            subSubHeading: string;
            subHeading: string;
            heading: string;
        };
    }
}
