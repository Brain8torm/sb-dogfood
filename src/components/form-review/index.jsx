import { Form } from '../form';
import { FormButton } from '../form-button';
import { FormInput } from '../form-input';
import styles from './form-review.module.css';
import classNames from 'classnames';
import { Rating } from '../rating';
import { useState } from 'react';
import { MAX_COUNT_RATING } from '../../utils/config';
import { Controller, useForm } from 'react-hook-form';

export function FormReview({ title = 'Отзыв о товаре', productId, setProduct }) {

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ mode: 'onBlur' });

    const [rating, setRating] = useState(MAX_COUNT_RATING);

    const handleSubmitFormReview = (data) => {
        console.log('handleSubmitFormReview', { ...data, rating });
        reset();
        setRating(MAX_COUNT_RATING)
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