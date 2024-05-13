import React from 'react'

const FadedText: React.FC<{text: string, redirectUri: string}> = ({text, redirectUri}) => {
  return (
    <>
        <p className="faded-text">{text}</p>
        <div style={{textAlign: 'center'}}>
        <a href={redirectUri} target="_blank" rel='noreferrer' >View job</a>
        </div>
    </>
  )
}

export default FadedText