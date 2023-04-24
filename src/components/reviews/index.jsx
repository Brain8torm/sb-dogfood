import { Review } from '../review';
import styles from './reviews.module.css';

export function Reviews({ reviews }) {
    return (
        <div className={styles.wrapper}>
            {reviews.map((review, index) => (
                <Review key={index} {...review} />
            ))}
        </div>

    );
}
