import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import styles from './review.module.css';
import { Rating } from '../rating';
import classNames from 'classnames';
export function Review({ _id, text, rating, author, created_at }) {
    return (
        <article className={classNames('review', styles.wrapper)} data-id={_id}>
            <div className={styles.header}>
                <div className={styles.meta}>
                    <span className={styles.author}>{author.name}</span>
                <span className={styles.date}>{dayjs(created_at).locale('ru').format('D MMMM YYYY')}</span>
                </div>
                <div className={styles.rating}>
                    <Rating currentRating={rating} />
                </div>
                
            </div>
            <div className={styles.content}>{text}</div>
        </article>
    );
}
