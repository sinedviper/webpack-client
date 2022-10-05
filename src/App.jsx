import React from "react";
import Gif from "images/giphy";

const App = () => {
  return (
    <div className='main'>
      <img src={Gif} alt='gif' className='image' />
      <h1>Damn</h1>
    </div>
  );
};

export default App;
