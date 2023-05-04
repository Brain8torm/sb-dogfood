import { useEffect } from 'react';

import Product from '../../components/product';
import { Spinner } from '../../components/spinner';
import { useParams } from 'react-router-dom';
import { NotFound } from '../../components/not-found';
import { useDispatch, useSelector } from 'react-redux';
import { changeLikeState, fetchSingleProduct } from '../../storage/single-product/single-product-slice';
import { fetchChangeLikeProduct } from '../../storage/products/products-slice';

export const ProductPage = () => {

    const { productID } = useParams();
    const dispatch = useDispatch();

    const { data: product, loading: isLoading, error: errorState } = useSelector(state => state.singleProduct)


    function handleProductLike(product) {
        dispatch(fetchChangeLikeProduct(product)).then(updateCard => {
            if (updateCard?.payload?.product) {
                dispatch(changeLikeState(updateCard.payload.product))
            }
        });
    }


    useEffect(() => {
        dispatch(fetchSingleProduct(productID))
    }, [dispatch, productID])

    return (
        <>
            {isLoading
                ? <Spinner />
                : !errorState &&
                <Product
                    onProductLike={handleProductLike}
                />
            }
            {!isLoading && errorState && <NotFound title='Товар не найден' />}

        </>
    );
}