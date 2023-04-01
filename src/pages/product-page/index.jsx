import { useEffect, useState } from 'react';
import api from '../../utils/api';
import styles from './product-page.module.css';
import Product from '../../components/product';
import { Spinner } from '../../components/spinner';


const ID_PRODUCT = '622c77e877d63f6e70967d22';


export const ProductPage = () => {

    const [product, setProduct] = useState({});
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        api.getInfoProduct(ID_PRODUCT).then(([productData, userData]) => {
            setCurrentUser(userData);
            setProduct(productData);

        }).catch(() => {
            console.log('Ошибка на стороне сервера');
        }).finally(() => {
            setIsLoading(false);
        });

    }, []);
    
    return (
        <div className={styles.wrapper}>
            {isLoading
            ? <Spinner />
            : <Product {...product} />
            }
        </div>
    );
}