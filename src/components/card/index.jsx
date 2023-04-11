import { ReactComponent as LikeIcon } from './images/save.svg';
import styles from './card.module.css';
import classNames from 'classnames';
import { calcDiscountPrice, isLiked } from '../../utils/products';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';
import { CardsContext } from '../../contexts/cards-context';
import ContentLoader from 'react-content-loader';


export function Card({
  name,
  price,
  discount,
  wight,
  description,
  pictures,
  tags,
  likes,
  _id,
  ...props
}) {
  const { currentUser } = useContext(UserContext);
  const { handleLike: onProductLike, isLoading } = useContext(CardsContext);
  const discount_price = calcDiscountPrice(price, discount);
  const like = currentUser && isLiked(likes, currentUser._id);


  function handleLikeButtonClick() {
    onProductLike({ likes, _id })
  }

  return (
    <>
      {isLoading
        ?
        <ContentLoader
          speed={2}
          width={186}
          height={385}
          viewBox="0 0 186 385"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <path d="M 0 0 h 185.6 v 187 H 0 z M 0 203 h 186 v 14 H 0 z M 0 233 h 186 v 56 H 0 z M 0 305 h 186 v 24 H 0 z" />
          <rect x="0" y="345" rx="20" ry="20" width="121" height="40" />
        </ContentLoader>
        : <>
          <article className={classNames(styles.item, 'card')}>
            <div className={classNames(styles.sticky, styles.sticky__type_top_left)}>
              {discount > 0 &&
                <span className={classNames(styles.discount)}>{` -${discount}%`}</span>
              }
            </div>
            <div className={classNames(styles.sticky, styles.sticky__type_top_right)}>
              <button className={classNames(styles.favorite, { [styles.favorite__is_active]: like })} onClick={handleLikeButtonClick}>
                <LikeIcon className={classNames(styles.icon)} />
              </button>
            </div>

            <Link to={`/product/${_id}`} className={classNames(styles.link)}>
              <img src={pictures} alt={name} className={classNames(styles.image)} sizes="
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
            </Link>
            <a href="#" className={classNames(styles.cart, styles.btn, styles.btn_type_primary)}>В корзину</a>
          </article></>
      }
    </>

  )
}