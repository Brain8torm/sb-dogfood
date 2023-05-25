export const isLiked = (likes, userId) => likes?.some((id) => id === userId);

export const calcDiscountPrice = (price, discount) =>
  Math.round(price - (price * discount) / 100);

export const calcReviewRating = (reviews) => {
  let sum = 0;
  reviews.forEach((review, index) => {
    sum += review.rating;
  });
  
  return (sum > 0 ? sum / reviews.length : 0).toFixed(2);
};
