import { Form } from '../form';
import { FormButton } from '../form-button';
import { FormInput } from '../form-input';
import styles from './form-review.module.css';
import classNames from 'classnames';
import { Rating } from '../rating';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchCreateReview } from '../../storage/single-product/single-product-slice';


export function FormReview({ title = 'Отзыв о товаре', productId }) {

    const dispatch = useDispatch();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ mode: 'onBlur' });

    const handleSubmitFormReview = (data) => {
        dispatch(fetchCreateReview({ productId, data }));
        reset();
    };

    const textRegister = register('text', {
        required: {
            value: true,
            message: 'Обязательное поле'
        }
    });

    return (
        <>
            <h3>{title}</h3>
            <Controller
                render={({ field }) => (
                    <Rating
                        currentRating={field.value}
                        setCurrentRating={field.onChange}
                        isEditable
                        error={errors.rating}
                    />
                )}
                name="rating"
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: 'Укажите рейтинг'
                    }
                }}
            />
            <Form handleFormSubmit={handleSubmit(handleSubmitFormReview)}>
                <FormInput
                    {...textRegister}
                    typeTag='textarea'
                    id='text'
                    placeholder='Напишите текст отзыва'
                />
                {errors?.text &&
                    <p className='message__error'>{errors?.text?.message}</p>
                }

                <FormButton
                    type='submit'
                    color='pramary'
                >Отправить отзыв</FormButton>
            </Form>
        </>
    );
}