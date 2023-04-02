import { ReactComponent as NotFoundIcon } from './images/ic-notfound.svg';

import { Button } from '../button'
import styles from "./not-found.module.css";
import classNames from 'classnames';

export function NotFound({ children, title, buttonText = "На главную", buttonAction }) {
  return (
    <div className={classNames('not-found', styles.wrapper)}>
      <NotFoundIcon className={styles.image} aria-hidden="true" />
      <h1 className={styles.title}>{title}</h1>
      {children && children}
      {buttonAction
        ? <Button type="border" href="#" action={buttonAction}>{buttonText}</Button>
        : <Button type="border" href="/">{buttonText}</Button>
      }
    </div>
  );
}