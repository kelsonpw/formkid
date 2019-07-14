console.log('loaded');

chrome.runtime.sendMessage({
  from: 'content',
  subject: 'showPageAction',
});

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.from === 'popup' && msg.subject === 'DOMInfo') {
    const inputs = document.querySelectorAll(
      'input[type="text"], input[type="password"], input[type="email"], textarea'
    );

    const inputDetails = Array.prototype.map.call(inputs, input =>
      JSON.stringify(input, [
        'id',
        'className',
        'tagName',
        'type',
        'name',
        'id',
        'value',
      ])
    );

    response(inputDetails);
  }
});

console.log('done');
