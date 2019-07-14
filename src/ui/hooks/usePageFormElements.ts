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
          setData(response.map(jsonElement => JSON.parse(jsonElement)));
        }
      );
    });
  }, []);

  return data;
}

export default usePageFormElements;
