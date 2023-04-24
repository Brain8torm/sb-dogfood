import classNames from 'classnames';
import styles from './product.module.css';
import { calcDiscountPrice, calcReviewRating, isLiked } from '../../utils/products';
import { ReactComponent as LikeIcon } from '../card/images/save.svg';
import truck from "./images/truck.svg";
import quality from "./images/quality.svg";
import { Button } from '../button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';
import { ContentHeader } from '../content-header';
import { Rating } from '../rating';
import { FormReview } from '../form-review';

function Product({
    _id,
    name,
    pictures,
    price,
    discount,
    description,
    likes = [],
    reviews = [],
    onProductLike,
    onProductReview,
    setProduct
}) {

    //const [currentRating, setCurrentRating] = useState(MAX_COUNT_RATING);

    const { currentUser } = useContext(UserContext);
            
    const navigate = useNavigate();
    const location = useLocation();

    const discount_price = calcDiscountPrice(price, discount);
    
    const rate = calcReviewRating(reviews);
    const like = isLiked(likes, currentUser?._id);
    
    function handleLikeClick() {
        onProductLike({ likes, _id })
    }

    function createMarkupDescription() {
        return { __html: description };
    }

    return (
        <>
        <div className='product'>
            <ContentHeader title={name} textButton='Назад'>
                <p className={classNames(styles.articul)}>Артикул: <b>2388907</b></p>
                <Rating currentRating={rate}  />
            </ContentHeader>
            <div className={classNames(styles.header)}>
                
            </div>
            <div className={classNames(styles.product)}>
                <div className={classNames(styles.img_wrapper)}>
                <div className={classNames(styles.sticky, styles.sticky__type_top_left)}>
        {discount > 0 &&
          <span className={classNames(styles.discount)}>{` -${discount}%`}</span>
        }
      </div>
                    <img src={pictures} alt={name} />
                </div>
                <div className={classNames(styles.desc)}>
                    {discount !== 0 ? (
                        <>
                            <span className={classNames(styles.old_price)}>{price}&nbsp;₽</span>
                            <span className={classNames(styles.price, styles.price_discount)}>{discount_price}&nbsp;₽</span>
                        </>
                    ) : (
                        <span className={classNames(styles.price)}>{price}&nbsp;₽</span>
                    )}

                    <div className={classNames(styles.btn_wrap)}>
                        <div className={classNames(styles.left)}>
                            <button className={classNames(styles.minus)}>-</button>
                            <span className={classNames(styles.num)}>0</span>
                            <button className={classNames(styles.plus)}>+</button>
                        </div>
                            <Button href='#' type='primary' style='wide'>В корзину</Button>

                    </div>
                    <div className={classNames(styles.btn_wrap)}>
                        <button className={classNames(styles.favorite, { [styles.favorite_active]: like })} onClick={handleLikeClick}>
                            <LikeIcon />
                            {like ? 'В избранном' : 'В избранное'}
                        </button>
                    </div>
                    <div className={styles.delivery}>
                        <img src={truck} alt="truck" />
                        <div className={styles.right}>
                            <h3 className={styles.name}>Доставка по всему Миру!</h3>
                            <p className={styles.text}>
                                Доставка курьером —{" "}
                                <span className={styles.bold}> от 399 ₽</span>
                            </p>
                            <p className={styles.text}>
                                Доставка в пункт выдачи —{" "}
                                <span className={styles.bold}> от 199 ₽</span>
                            </p>
                        </div>
                    </div>
                    <div className={styles.delivery}>
                        <img src={quality} alt="quality" />
                        <div className={styles.right}>
                            <h3 className={styles.name}>Гарантия качества</h3>
                            <p className={styles.text}>
                                Если Вам не понравилось качество нашей продукции, мы вернем
                                деньги, либо сделаем все возможное, чтобы удовлетворить ваши
                                нужды.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.box}>
                <h2 className={styles.title}>Описание</h2>
                <p className={styles.subtitle} dangerouslySetInnerHTML={createMarkupDescription()}></p>
                <h2 className={styles.title}>Характеристики</h2>
                <div className={styles.grid}>
                    <div className={styles.naming}>Вес</div>
                    <div className={styles.description}>1 шт 120-200 грамм</div>
                    <div className={styles.naming}>Цена</div>
                    <div className={styles.description}>490 ₽ за 100 грамм</div>
                    <div className={styles.naming}>Польза</div>
                    <div className={styles.description}>
                        <p>
                            Большое содержание аминокислот и микроэлементов оказывает
                            положительное воздействие на общий обмен веществ собаки.
                        </p>
                        <p>Способствуют укреплению десен и жевательных мышц.</p>
                        <p>
                            Развивают зубочелюстной аппарат, отвлекают собаку во время смены
                            зубов.
                        </p>
                        <p>
                            Имеет цельную волокнистую структуру, при разжевывание получается
                            эффект зубной щетки, лучше всего очищает клыки собак.
                        </p>
                        <p>Следует учесть высокую калорийность продукта.</p>
                    </div>
                </div>
            </div>
        </div>

            <FormReview
                title={`Отзыв о товаре ${name}`}
                productId={_id}
                rate={rate}
                setProduct={setProduct}
                onProductReview={onProductReview}
            />
        </>
    );
}

export default Product;