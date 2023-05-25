import { useIsMobile } from '../../hooks/useMobile';
import home from './images/ic-home.svg';
import catalog from './images/ic-catalog.svg';
import cart from './images/ic-cart.svg';
import favorites from './images/ic-favorites.svg';
import profile from './images/ic-profile.svg';
import styles from './mobile-bar.module.css';
import classNames from 'classnames';

export function MobileBar() {
    const isMobile = useIsMobile();

    return (
        <>
            {isMobile &&
                <div className={classNames('mobile_bar', styles.wrapper)}>
                    <div className={classNames(styles.nav)}>
                        <div className={classNames(styles.nav__item)}>
                            <a href="#" className={classNames(styles.nav__link)}>
                                <img src={home} alt='home' className={classNames(styles.nav__icon)} />
                                <span className={classNames(styles.nav__title)}>Главная</span>
                            </a>
                        </div>
                        <div className={classNames(styles.nav__item)}>
                            <a href="#" className={classNames(styles.nav__link)}>
                                <img src={catalog} alt='catalog' className={classNames(styles.nav__icon)} />
                                <span className={classNames(styles.nav__title)}>Каталог</span>
                            </a>
                        </div>
                        <div className={classNames(styles.nav__item)}>
                            <a href="#" className={classNames(styles.nav__link)}>
                                <img src={cart} alt='cart' className={classNames(styles.nav__icon)} />
                                <span className={classNames(styles.nav__title)}>Корзина</span>
                            </a>
                        </div>
                        <div className={classNames(styles.nav__item)}>
                            <a href="#" className={classNames(styles.nav__link)}>
                                <img src={favorites} alt='favorites' className={classNames(styles.nav__icon)} />
                                <span className={classNames(styles.nav__title)}>Избранное</span>
                            </a>
                        </div>
                        <div className={classNames(styles.nav__item)}>
                            <a href="#" className={classNames(styles.nav__link)}>
                                <img src={profile} alt='profile' className={classNames(styles.nav__icon)} />
                                <span className={classNames(styles.nav__title)}>Профиль</span>
                            </a>
                        </div>
                    </div>
                </div>
            }
        </>

    );
}


