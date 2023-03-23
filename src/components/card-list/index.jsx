import { Card } from "../card";
import styles from './card-list.module.css';
import classNames from 'classnames';

export function CardList({ goods, currentUser, onProductLike }) {
// console.log('currentUser', currentUser);
  return (
    <div className={classNames(styles.cards, 'content__cards')}>
      {goods.map((dataItem, index) => (
        <Card key={index} {...dataItem} onProductLike={onProductLike} currentUser={currentUser} />
      ))}
    </div>

  );
}
