import React, { useState } from 'react';
import styled from 'styled-components';
import { setCookie } from 'cookies-next';
import { v4 as uuid } from 'uuid';
import Button from '@/components/buttons/button';
import { FlexCCC } from '@/styles/StyledMain';
import { useAppDispatch, useAppSelector } from '@/services/hook';
import { formatPhoneNumber } from '@/utils/format-phone-number';
import { Input, TInputInterface } from '@/components/input/input';
import { initMemberCountChange } from '@/services/futureEventSignUpData';
import { onOpenModalFormSubmitSuccess, onOpenModalPolicy } from '@/services/modalSlice';
import { PreloaderSmall } from '@/components/preloader/preloader-small';



const StyledForm = styled.form({
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: '2rem',
    width: '90%',
    '@media only screen and (min-width: 50em)': {
        width: '100%',
    },
});
const ButtonContainer = styled(FlexCCC)({
    flexDirection: 'column-reverse',
    gap: '1rem',
    '@media only screen and (min-width: 50em)': {
        flexDirection: 'row',
    },
});
const Disclaimer = styled.p((props) => ({
    width: '50%',
    fontSize: '0.7rem',
    textAlign: 'center',
    textDecoration: 'underline',
    '@media only screen and (max-width: 500px)': {
        fontSize: '0.6rem',
        width: '70%',
    }
}));

type FlexDirection = 'column' | 'inherit' | '-moz-initial' | 'initial' | 'revert' | 'unset' | 'column-reverse' | 'row' | 'row-reverse' | undefined;
interface IProps {
    flexDirection?: FlexDirection;
    setSubmitSuccess?: React.Dispatch<React.SetStateAction<boolean | null>>;
    setError?: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const SubmitForm = ({ flexDirection, setSubmitSuccess, setError }: IProps) => {
    const dispatch = useAppDispatch();
    const { isModalOpen } = useAppSelector((state) => state.modal);
    const { futureEventDetails } = useAppSelector((state) => state.futureEventDetails);
    const [loading, setLoading] = useState<boolean>(false);

    const [values, setValues] = useState({
        name: '',
        tel: '',
    });

    const [isInputFocused, setIsInputFocused] = useState(false);

    // const [emailError, setEmailError] = useState<boolean | null>(null);
    const [phoneError, setPhoneError] = useState<boolean | null>(null);
    const [phonePlaceholderText, setPhonePlaceholderText] = useState('Телефон');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'tel') {
            setPhoneError(null);
            const formattedPhoneNumber = formatPhoneNumber(e.target.value);
            setValues({ ...values, [e.target.name]: formattedPhoneNumber });
            setPhonePlaceholderText('Телефон без +7');
        } else {
            setValues({ ...values, [e.target.name]: e.target.value });
        }
    };

    const handleValidatePhone = () => {
        if (!values.tel) {
            setPhoneError(null);
            return;
        }
        if (values.tel.length !== 15 || parseInt(values.tel.charAt(1)) !== 9) {
            setPhoneError(true);
        } else if (values.tel.length === 15 && parseInt(values.tel.charAt(1)) === 9) {
            setPhoneError(false);
        }
    };

    // PHONE VALIDATION AND PHONE PLACEHOLDER NAME TOGGLE
    const handlePhoneValidationAndPlaceholderNameChange = () => {
        setIsInputFocused(!isInputFocused);
        if (phonePlaceholderText === 'Телефон') {
            setPhonePlaceholderText('Телефон без +7');
        } else {
            setPhonePlaceholderText('Телефон');
            handleValidatePhone();
        }
    };

    const handleValidateAll = () => {
        setIsInputFocused(false);
        if (values.name && values.tel) {
            handleValidatePhone();
        }
    };

    const handleChangeFocusStatus = () => {
        setIsInputFocused(true);
    };

    interface Inputs extends TInputInterface {
        id: string;
    }

    const inputs: Inputs[] = [
        {
            id: '1',
            value: values.name,
            name: 'name',
            type: 'text',
            placeholder: 'Имя',
            error: false,
            errorText: 'Ошибка',
            icon: 'ProfileIcon',
            onChange: handleChange,
            onFocus: handleChangeFocusStatus,
            onBlur: handleValidateAll,
        },
        {
            id: '2',
            value: values.tel,
            name: 'tel',
            type: 'tel',
            placeholder: phonePlaceholderText,
            error: phoneError,
            errorText: 'Пожалуйста, введите корректный телефон',
            icon: 'InfoIcon',
            onChange: handleChange,
            onFocus: handlePhoneValidationAndPlaceholderNameChange,
            onBlur: handlePhoneValidationAndPlaceholderNameChange,
        },
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setCookie('name', values.name, { maxAge: 60 * 60 * 24 * 7, path: '/', secure: true, sameSite: 'lax' })
        // Cookies.set('name', values.name, { expires: 7, path: '/', secure: true, sameSite: 'Lax' });

        // If user submits form for FutureEvent
        if (futureEventDetails) {
            const data = {
                name: values.name,
                tel: values.tel,
                event: futureEventDetails.title,
                age: futureEventDetails.age,
                date: futureEventDetails.dateFull,
            };
            setValues({
                name: '',
                tel: '',
            });
            setPhoneError(null);
            const JSONdata = JSON.stringify(data);
            const endpoint = '/api/form-submit';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSONdata,
            };
            const response = await fetch(endpoint, options);
            const result = await response.json();
            // Here Module is always open
            if (result.status === 500) {
                // ERROR
                if (setError) {
                    setError(true);
                }
            } else if (result.status === 200) {
                // SUCCESS
                if (setSubmitSuccess) {
                    setSubmitSuccess(true);
                }
                dispatch(initMemberCountChange());
            }
        }
        // If user submits for to contact them
        else {
            // Move data to another variable so we can clean setValues
            const data = {
                name: values.name,
                tel: values.tel,
            };
            setValues({
                name: '',
                tel: '',
            });
            setPhoneError(null);
            const JSONdata = JSON.stringify(data);
            const endpoint = '/api/form-submit';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSONdata,
            };
            const response = await fetch(endpoint, options);
            const result = await response.json();
            console.log(result);
            if (result.status === 500) {
                // ERROR
                if (isModalOpen && setError) {
                    setError(true);
                } else {
                    dispatch(onOpenModalFormSubmitSuccess(false));
                }
            } else if (result.status === 200) {
                // SUCCESS
                if (isModalOpen && setSubmitSuccess) {
                    setSubmitSuccess(true);
                } else {
                    dispatch(onOpenModalFormSubmitSuccess(true));
                }
            }
        }
        setLoading(false);
    };

    return (
        <>
            <StyledForm onSubmit={(e) => handleSubmit(e)} >
                {inputs.map((input) => (
                    <Input
                        key={input.id}
                        value={input.value}
                        name={input.name}
                        type={input.type}
                        placeholder={input.placeholder}
                        icon={input.icon}
                        error={input.error}
                        errorText={input.errorText}
                        onChange={input.onChange}
                        onFocus={input.onFocus}
                        onBlur={input.onBlur}
                    />
                ))}
                <ButtonContainer style={{ flexDirection: flexDirection }}>
                    <Button
                        typeHTML='submit'
                        type='primary'
                        disabled={!values.name || !values.tel || phoneError || phoneError === null ? true : false}
                        animate={true}
                        isInputFocused={isInputFocused}>
                        {loading ? <PreloaderSmall /> : 'Записаться'}
                    </Button>
                    <Disclaimer
                        onClick={() => dispatch(onOpenModalPolicy())}>
                        Нажимая кнопку, вы даёте согласие на обработку своих персональных данных
                    </Disclaimer>
                </ButtonContainer>
            </StyledForm>
        </>
    );
};
export default SubmitForm;
