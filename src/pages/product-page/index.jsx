import { useEffect, useState } from 'react';
import api from '../../utils/api';
import styles from './product-page.module.css';
import Product from '../../components/product';
import { Spinner } from '../../components/spinner';
import { useParams } from 'react-router-dom';
import { NotFound } from '../../components/not-found';





export const ProductPage = () => {

    const [product, setProduct] = useState({});
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorState, setErrorState] = useState(null);
    const { productID } = useParams();

    useEffect(() => {
        setIsLoading(true);

        api.getInfoProduct(productID).then(([productData, userData]) => {
            setCurrentUser(userData);
            setProduct(productData);

        }).catch((err) => {
            setErrorState(err);
            console.log('Ошибка на стороне сервера');
        }).finally(() => {
            setIsLoading(false);
        });

    }, []);

    return (
        <>
            {isLoading
                ? <Spinner />
                : !errorState && <Product {...product} />
            }
            {!isLoading && errorState && <NotFound title='Товар не найден' /> }

        </>
    );
}