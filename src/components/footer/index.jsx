import styles from './footer.module.css';
import classNames from 'classnames';
import telegram from "./images/telegram.svg";
import instagram from "./images/instagram.svg";
import viber from "./images/viber.svg";
import whatsapp from "./images/whatsapp.svg";
import vk from "./images/vk.svg";
import { useIsMobile } from '../../hooks/useMobile';

import { Logo } from '../logo';


export function Footer() {
  const isMobile = useIsMobile();

  return (
    <footer className={classNames('footer', styles.section)}>
      <div className={classNames('container')}>
        <div className={classNames(styles.wrapper)}>
          <div className={classNames(styles.col)}>
            <Logo className={classNames(styles.logo)} title="Логотип" aria-hidden={true} />
            <p className={classNames(styles.copyright)}>
              &copy; «Интернет-магазин DogFood.ru»
            </p>
          </div>
          <div className={classNames(styles.col)}>
            <nav className={classNames('menu-bottom', styles.menu)}>
              <a href="/catalogue" className={classNames(styles.menu__item)}>
                Каталог
              </a>
              <a href="/catalogue" className={classNames(styles.menu__item)}>
                Акции
              </a>
              <a href="/catalogue" className={classNames(styles.menu__item)}>
                Новости
              </a>
              <a href="/catalogue" className={classNames(styles.menu__item)}>
                Отзывы
              </a>
            </nav>
          </div>
          <div className={classNames(styles.col)}>
            <nav className={classNames('menu-bottom', styles.menu)}>
              <a href="/catalogue" className={classNames(styles.menu__item)}>
                Оплата и доставка
              </a>
              <a href="/catalogue" className={classNames(styles.menu__item)}>
                Часто спрашивают
              </a>
              <a href="/catalogue" className={classNames(styles.menu__item)}>
                Обратная связь
              </a>
              <a href="/catalogue" className={classNames(styles.menu__item)}>
                Контакты
              </a>
            </nav>
          </div>



          <div className={classNames(styles.col)}>
            <div className={classNames(styles.contacts)}>
              <p className={classNames(styles.contacts__title)}>{isMobile ? 'Мы всегда на связи' : 'Мы на связи'}</p>
              <a className={classNames(styles.contacts__tel, styles.contacts__link)} href="tel:89177172179">
                8 (999) 00-00-00
              </a>
              <a className={classNames(styles.contacts__mail, styles.contacts__link)} href="mailto:hordog.ru@gmail.com">
                dogfood.ru@gmail.com
              </a>
              <ul className={classNames(styles.socials)}>
                <li className={classNames(styles.socials__item)}>
                  <a className={classNames(styles.socials__link)} href="/#">
                    <img src={telegram} alt="telegram" className={classNames(styles.socials__icon)} />
                  </a>
                </li>

                <li className={classNames(styles.socials__item)}>
                  <a className={classNames(styles.socials__link)} href="/#">
                    <img src={whatsapp} alt="whatsapp" className={classNames(styles.socials__icon)} />
                  </a>
                </li>
                <li className={classNames(styles.socials__item)}>
                  <a className={classNames(styles.socials__link)} href="/#">
                    <img src={viber} alt="viber" className={classNames(styles.socials__icon)} />
                  </a>
                </li>
                <li className={classNames(styles.socials__item)}>
                  <a className={classNames(styles.socials__link)} href="/#">
                    <img src={instagram} alt="instagram" className={classNames(styles.socials__icon)} />
                  </a>
                </li>
                <li className={classNames(styles.socials__item)}>
                  <a className={classNames(styles.socials__link)} href="/#">
                    <img src={vk} alt="vk" className={classNames(styles.socials__icon)} />
                  </a>
                </li>
              </ul>
            </div>

          </div>


        </div>
      </div>


    </footer>
  )
}