import React from 'react'
import { toAbsoluteUrl } from '../AssetHelpers'
type Props = {
  className?: string
  path: string
  svgClassName?: string
}

const KTSVG: React.FC<Props> = ({ className = '', path, svgClassName = 'mh-50px' }) => {
  return (
    <span className={`svg-icon ${className}`}>
      <img src={toAbsoluteUrl(path)} className={svgClassName} />
    </span>
  )
}

export { KTSVG }
