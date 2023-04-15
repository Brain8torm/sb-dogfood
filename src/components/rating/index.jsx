import { ReactComponent as StarIcon } from './images/star.svg';
import { MAX_COUNT_RATING } from '../../utils/config';
import classNames from 'classnames';
import styles from './rating.module.css';
import { useEffect, useState } from 'react';

export function Rating({ isEditable = false, currentRating, setCurrentRating }) {
    const [ratingArray, setRatingArray] = useState(new Array(MAX_COUNT_RATING).fill(<></>));

    const constructRating = (filledRating) => {

        const updateArray = ratingArray.map((ratingElement, index) => {
            return (
                <StarIcon
                    className={
                        classNames(
                            styles.star__icon,
                            {
                                [styles.star__icon_filled]: index < filledRating,
                                [styles.star__icon_editable]: isEditable,
                            }
                        )
                    }
                    onMouseEnter={() => changeDisplay(index + 1)}
                    onMouseLeave={() => changeDisplay(currentRating)}
                    onClick={() => changeRating(index + 1)}
                />
            )
        });

        setRatingArray(updateArray);
    };

    function changeDisplay(rating) {
        constructRating(rating);
    }

    function changeRating(rating) {
        //if (!isEditable || !setCurrentRating) return;
        setCurrentRating(rating);
    }

    useEffect(() => {
        constructRating(currentRating);
    }, [currentRating])

    return (
        <div className={classNames('rating', styles.wrapper)}>
            {ratingArray.map((r, i) => <span className={classNames(styles.star)} key={i}>{r}</span>)}
        </div>

    );
}
