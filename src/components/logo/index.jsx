import styles from './logo.module.css';
import classNames from 'classnames';
import logoSrc from './images/logo.svg';

export function Logo() {
  return (
    <a href="/" className={classNames(styles.link)}>
      <img src={logoSrc} alt="Логотип" className={classNames(styles.image)} />
    </a>
  )
}