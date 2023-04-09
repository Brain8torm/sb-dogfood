import { useContext, useCallback } from 'react';
import api from '../../utils/api';
import Product from '../../components/product';
import { Spinner } from '../../components/spinner';
import { useParams } from 'react-router-dom';
import { NotFound } from '../../components/not-found';
import { CardsContext } from '../../contexts/cards-context';
import { UserContext } from '../../contexts/current-user-context';
import { useApi } from '../../hooks';

export const ProductPage = () => {

    const { productID } = useParams();
    const handleGetProduct = useCallback(() => api.getProductById(productID), [productID]);
    const { data: product, loading: isLoading, error: errorState, setData: setProduct } = useApi(handleGetProduct);
  
    
    const { handleLike } = useContext(CardsContext);

    function handleProductLike(product) {
        handleLike(product)
            .then(updateCard => {
                setProduct(updateCard);
            });
    }

    return (
        <>
            {isLoading
                ? <Spinner />
                : !errorState &&
                <Product
                    {...product}
                    onProductLike={handleProductLike}
                />
            }
            {!isLoading && errorState && <NotFound title='Товар не найден' />}

        </>
    );
}