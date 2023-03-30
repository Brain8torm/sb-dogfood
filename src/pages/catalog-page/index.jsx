import { CardList } from '../../components/card-list';
import { Sort } from '../../components/sort';
import styles from './catalog-page.module.css';

export const CatalogPage = ({ cards, handleProductLike, currentUser }) => {
    return (
        <>
            <Sort />
            <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser} />
        </>

    );
}