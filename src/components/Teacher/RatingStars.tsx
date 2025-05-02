import classNames from 'classnames'

interface RatingStarsProps {
  className?: string
  rating: number
  reviews: number
}

const RatingStars = ({ className, rating, reviews }: RatingStarsProps) => {
  return (
    <div
      className={classNames(
        'flex flex-col items-center md:items-start',
        className
      )}
    >
      <span className="font-bold text-lg">
        {rating}
        {[...Array(Math.floor(rating))].map((_, i) => (
          <span key={i} className="text-yellow-400">
            &#11088;
          </span>
        ))}
      </span>

      <span className="font-bold text-lg">
        {reviews} <span className="font-normal">відгуків</span>
      </span>
    </div>
  )
}

export default RatingStars
