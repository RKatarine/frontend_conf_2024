import React, { memo } from 'react'
import cn from 'classnames'
import { parseCurrency } from './parseCurrency'

import styles from './Price.module.css'

interface IProps {
  className?: string
  value?: string | number
  type?: 'discount' | 'original' | 'default'
  isOutOfStock?: boolean
  isNewModal?: boolean
}

export const Price = memo(function Price({
  value,
  isOutOfStock,
  className,
  type = 'default',
}: IProps) {
  if (!value) {
    return null
  }

  return (
    <div
      className={cn(className, styles.root, {
        [styles[type]]: type,
        [styles.outOfStock]: isOutOfStock,
        [styles.outOfStockNewModal]: isOutOfStock,
      })}
    >
      <span>
        {parseCurrency(value)}
      </span>
    </div>
  )
})
