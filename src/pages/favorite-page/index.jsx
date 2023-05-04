import { useContext } from 'react';
import { CardList } from '../../components/card-list';
import { Spinner } from '../../components/spinner';
import { CardsContext } from '../../contexts/cards-context';
import styles from './favorite-page.module.css';
import { ContentHeader } from '../../components/content-header';
import { useSelector } from 'react-redux';

export const FavoritePage = () => {

    const goods = useSelector(state => state.products.favoriteProducts);
    return (
        <>
            <ContentHeader title='Избранное' textButton='Назад' />
            <CardList goods={goods} />
        </>
    );
}