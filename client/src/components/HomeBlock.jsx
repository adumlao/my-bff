import React from 'react';

const HomeBlock = (props) => {
  return(
    <div className='home-greeting'>
      <div className="home-logo" style={{ backgroundImage: 'url(/media/header.gif)' }}></div>
      <div className="home-tag">cuteness is forever.</div>
    </div>
  )
}

export default HomeBlock;
