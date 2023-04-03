import { CardList } from '../../components/card-list';
import { Sort } from '../../components/sort';
import { Spinner } from '../../components/spinner';
import styles from './catalog-page.module.css';

export const CatalogPage = ({ isLoading }) => {
    return (
        <>

            {isLoading
                ? <Spinner />
                : <>
                    <Sort />
                    <CardList />
                </>
            }

        </>

    );
}