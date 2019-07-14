/** global chrome */

import * as React from 'react';

function usePageFormElements() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          from: 'popup',
          subject: 'DOMInfo',
        },
        response => {
          setData(response);
        }
      );
    });
  }, []);

  return data;
}

// 'id',
// 'className',
// 'tagName',
// 'type',
// 'name',
// 'id',
// 'value',

// --------------

export default usePageFormElements;
