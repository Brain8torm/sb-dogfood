import classNames from 'classnames';
import styles from './sort.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { sortedProducts } from '../../storage/products/products-slice';

export function Sort({ tabs = [] }) {
  const dispatch = useDispatch();
  const currentSort = useSelector(state => state.products.currentSort)


  function handleTabClick(e, tab) {
    e.preventDefault();
    dispatch(sortedProducts(tab.id));
  }

  return (
    <>
      <div className={classNames(styles.wrapper)}>
        {tabs.map((tab, index) => (
          <a
            key={index} href='#' onClick={
              (e) => handleTabClick(e, tab)
            }
            className={classNames(styles.link, {
              [styles.link_selected]: currentSort === tab.id
            })}
          >{tab.title}</a>
        ))}
      </div>
    </>
  )
}