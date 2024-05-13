import React from 'react'

const CustomChip: React.FC<{content: any}> = ({content}) => {
  return (
    <div className='custom-chip'>
        {content}
    </div>
  )
}

export default CustomChip