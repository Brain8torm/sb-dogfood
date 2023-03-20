import likeIcon from './images/save.svg';
import styles from './card.module.css';
import classNames from 'classnames';


export function Card({ name, price, discount, wight, description, picture }) {

  const discount_price = Math.round(price - (price * discount) / 100);


  return (
    <article className={classNames(styles.item, 'card')}>
      <div className={classNames(styles.sticky, styles.sticky__type_top_left)}>
        { discount > 0 && 
        <span className={classNames(styles.discount)}>{` -${discount}%`}</span>
        }
      </div>
      <div className={classNames(styles.sticky, styles.sticky__type_top_right)}>
        <button className={classNames(styles.favorite)}>
          <img src={likeIcon} alt="" className={classNames(styles.favorite__icon)} width="24px" height="24px" />
        </button>
      </div>
      <a href="/" className={classNames(styles.link)}>
        <img src={picture} alt={name} className={classNames(styles.image)} sizes="
    (max-width: 500px) calc(100vw - 2rem), 
    (max-width: 700px) calc(100vw - 6rem),
    calc(100vw - 9rem - 200px)
  " />
        <div className={classNames(styles.desc)}>
          {discount !== 0 ? (
            <>
              <span className={classNames(styles.old_price)}>{price}&nbsp;₽</span>
              <span className={classNames(styles.price, styles.price_type_discount)}>{discount_price}</span>
            </>
          ) : (
            <span className={classNames(styles.price)}>{price}&nbsp;₽</span>
          )}
          <span className={classNames(styles.wight)}>{wight}</span>
          <h3 className={classNames(styles.name)}>{name}</h3>
        </div>
      </a>
      <a href="#" className={classNames(styles.cart, styles.btn, styles.btn_type_primary)}>В корзину</a>
    </article >
  )
}