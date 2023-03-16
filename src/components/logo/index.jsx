import styles from './logo.module.css';
import classNames from 'classnames';
import logoSrc from './images/logo.svg';
import logoMobileSrc from './images/logo-mobile.svg';

export function Logo() {
  return (
    <a href="/" className={classNames(styles.link)}>
      <picture>
        <source
          srcSet={logoMobileSrc}
          media="(max-width: 700px)"
          width="40px"
        />
        <img
          src={logoSrc}
          alt="Логотип"
          className={classNames(styles.image)}
        />
      </picture>
    </a>
  )
}