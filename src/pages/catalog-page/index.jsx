import { useContext } from 'react';
import { CardList } from '../../components/card-list';
import { Sort } from '../../components/sort';
import { Spinner } from '../../components/spinner';
import { CardsContext } from '../../contexts/cards-context';
import styles from './catalog-page.module.css';
import { ContentHeader } from '../../components/content-header';

export const CatalogPage = () => {

    const { cards: goods } = useContext(CardsContext);

    return (
        <>
            <ContentHeader title='Главная' textButton='Главная' to='/' />
            <Sort />
            <CardList goods={goods} />
        </>

    );
}