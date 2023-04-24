import { Form } from '../form';
import { FormButton } from '../form-button';
import { FormInput } from '../form-input';
import styles from './form-review.module.css';
import classNames from 'classnames';
import { Rating } from '../rating';
import { Controller, useForm } from 'react-hook-form';
import api from '../../utils/api';
import { useState } from 'react';
import { MAX_COUNT_RATING } from '../../utils/config';

export function FormReview({ title = 'Отзыв о товаре', productId, rate, setProduct }) {

    const [rating, setRating] = useState(MAX_COUNT_RATING);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ mode: 'onBlur' });



    const handleSubmitFormReview = (data) => {
        api.setProductReview(productId, { ...data, rating })
            .then(newProduct => {
                setProduct && setProduct(newProduct)
                reset();
                setRating(rate)
            })
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