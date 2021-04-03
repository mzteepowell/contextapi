import React from 'react';
import Confetti from 'react-confetti'

const ConfettiPage = () => {

  let width, height = '1000px'
  return (
    <Confetti
      width={width}
      height={height}
      />
  )
}

export default ConfettiPage;