import { FC } from 'react';
import { StyledPopUp } from './FormPopUpSubmitSuccess';
import { getCookie } from 'cookies-next';

const FormPopUpSubmitFail: FC = () => {
    const name = getCookie('name');

    return (
        <StyledPopUp>
            <h1>Произошла ошибка{name ? `, ${name}` : null} 😭</h1>
            <p>Попробуйте, пожалуйста, снова!</p>
        </StyledPopUp>
    );
};
export default FormPopUpSubmitFail;