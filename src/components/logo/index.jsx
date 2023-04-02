import styles from './logo.module.css';
import classNames from 'classnames';
import logoSrc from './images/logo.svg';
import logoMobileSrc from './images/logo-mobile.svg';
import { Link } from 'react-router-dom';

export function Logo({ className, href, ...props }) {
  const hrefValue = href ? href : null;

  return (
    hrefValue
      ?
      <Link replace to={{ pathname: hrefValue }} className={classNames(styles.link, { className: !!className })} {...props}>
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
      </Link>
      :
      <span className={classNames(styles.link, className)}>
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
      </span>

  )
}