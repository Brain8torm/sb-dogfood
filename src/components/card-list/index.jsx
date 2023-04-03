import { useContext } from 'react';
import { Card } from "../card";
import styles from './card-list.module.css';
import classNames from 'classnames';
import { CardsContext } from '../../contexts/cards-context';

export function CardList() {
  const { cards: goods } = useContext(CardsContext);
  return (
    <div className={classNames(styles.cards, 'content__cards')}>
      {goods.map((dataItem, index) => (
        <Card key={index} {...dataItem} />
      ))}
    </div>
  );
}
