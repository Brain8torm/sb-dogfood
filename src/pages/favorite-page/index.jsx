import { useContext } from 'react';
import { CardList } from '../../components/card-list';
import { Spinner } from '../../components/spinner';
import { CardsContext } from '../../contexts/cards-context';
import styles from './favorite-page.module.css';
import { ContentHeader } from '../../components/content-header';

export const FavoritePage = () => {

    const { favorites: goods } = useContext(CardsContext);
    return (
        <>
            <ContentHeader title='Избранное' textButton='Назад' />
            <CardList goods={goods} />
        </>
    );
}