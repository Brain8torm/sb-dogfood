import { useForm } from 'react-hook-form';
import { Form } from '../form';
import { FormInput } from '../form-input';
import { FormButton } from '../form-button';
import styles from './login.module.css';
import classNames from 'classnames';

export function Login({ onSubmit, onNavigateRegister, onNavigateReset }) {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' })

    const emailRegister = register('email', {
        required: {
            value: true,
            message: 'Обязательное поле'
        },
        pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'E-mail не соотвествует формату электронной почты'
        }
    })

    const passwordRegister = register('password', {
        required: {
            value: true,
            message: 'Обязательное поле'
        },
        /*pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: `Пароль должен содержать минимум восемь символов, одну 
                        букву латинского алфавита и одну цифру`
        }*/
    })


    return (

        <Form title='Вход' handleFormSubmit={handleSubmit(onSubmit)}>
            <FormInput
                {...emailRegister}
                id='email'
                type='text'
                placeholder='email'
            />
            {errors?.email && <p className='message__error'>{errors?.email?.message}</p>}

            <FormInput
                {...passwordRegister}
                id='password'
                type='password'
                placeholder='Пароль'
            />
            {errors?.password && <p className='message__error'>{errors?.password?.message}</p>}
            <p className={classNames('message__info', styles.link)} onClick={onNavigateReset}>Восстановить пароль</p>


            <FormButton type="submit" color='pramary'>Войти</FormButton>
            <FormButton type="button" color='secondary' onClick={onNavigateRegister}>Регистрация</FormButton>
        </Form>

    );
}
