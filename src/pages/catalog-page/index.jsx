import { useContext } from 'react';
import { SORT_TABS } from '../../utils/config';
import { CardList } from '../../components/card-list';
import { Sort } from '../../components/sort';
import { CardsContext } from '../../contexts/cards-context';
import styles from './catalog-page.module.css';
import { ContentHeader } from '../../components/content-header';
import { useSelector } from 'react-redux';



export const CatalogPage = () => {

    const goods = useSelector(state => state.products.data);

    return (
        <>
            <ContentHeader title='Главная' textButton='Главная' to='/' />
            <Sort tabs={ SORT_TABS } currentSort='discount' onChangeSort={(data)=>console.log(data)} />
            <CardList goods={goods} />
        </>

    );
}