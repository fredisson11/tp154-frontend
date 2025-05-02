import classNames from 'classnames'

interface PriceBlockProps {
  price: number
  className?: string
}

const PriceBlock = ({ price, className }: PriceBlockProps) => {
  return (
    <span className={classNames('text-2xl', className)}>
      <span className="text-primary text-3xl font-bold mr-2">{price}</span>
      грн/год
    </span>
  )
}

export default PriceBlock
