import * as React from 'react';

import { goBack } from '../router';

function Configure({ elements }) {
  return (
    <div>
      {elements}
      <button onClick={goBack}>Go back</button>
    </div>
  );
}

export default Configure;
