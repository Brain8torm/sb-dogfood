import classNames from 'classnames';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';


export function RegisterForm({ handleForm }) {

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });

    const cbSubmitForm = (dataForm) => {
        console.log(dataForm);
    }

    const emailRegister = register('email', {
        required: {
            value: true,
            message: 'Обязательное поле'
        },
        pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Email не соотвествует формату электронной почты"
        }
    });

    return (
        <form className={classNames(styles.form)} onSubmit={handleSubmit(cbSubmitForm)} noValidate>
            <h3>Регистрация</h3>
            <input
                {...register('name', {
                    required: {
                        value: true,
                        message: 'Обязательное поле'
                    },
                    minLength: {
                        value: 3,
                        message: 'Минимальная длина 3 символа'
                    }
                })} type='text' placeholder='Имя' />
            {errors?.name && <p className={styles.errorMessage}>{errors?.name?.message}</p>}
            <input {...emailRegister} type='email' placeholder='E-mail' autoComplete='off' />
            {errors?.email && <p className={styles.errorMessage}>{errors?.email?.message}</p>}
            <input {...register('password', {
                    required: true,
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message: "Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру"
                    }
            })} type='password' placeholder='Пароль' autoComplete='off' />
            {errors?.password && <p className={styles.errorMessage}>{errors?.password?.message}</p>}
            <button>Зарегистрироваться</button>
        </form>


    );
}
