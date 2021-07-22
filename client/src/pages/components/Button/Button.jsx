import React from 'react';

import './Button.scss';

function Button({ buttonText, callbackFunction, ...rest}) {
  return (
    <button type="submit" onClick={callbackFunction} {...rest}>{buttonText}</button>
  );
};

export { Button };