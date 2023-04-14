import classNames from 'classnames';
import styles from './sort.module.css';
import { useContext } from 'react';
import { CardsContext } from '../../contexts/cards-context';

export function Sort({ tabs = [] }) {
  const { currentSort, setCurrentSort, onSortData } = useContext(CardsContext);


  function handleTabClick(e, tab) {
    e.preventDefault();
    setCurrentSort(tab.id);
    onSortData(tab.id);
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