import React from 'react'

const CaretUpIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={`caret-up_icon ${className}`}
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      viewBox='0 0 256 256'
    >
      <path d='M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z'></path>
    </svg>
  )
}

export default CaretUpIcon
