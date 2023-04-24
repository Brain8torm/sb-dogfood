import { Card } from "../card";
import styles from './card-list.module.css';
import classNames from 'classnames';

export function CardList({ goods }) {

  return (
    <>
      
      <div className={classNames(styles.cards, 'content__cards')}>
        <h3>Отзывы</h3>
        {goods.map((dataItem, index) => (
          <Card key={index} {...dataItem} />
        ))}
      </div>
    </>

  );
}
