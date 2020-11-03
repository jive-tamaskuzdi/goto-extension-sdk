const handlers = {};

window.addEventListener('message', (event => {
  //TODO check event.origin if it's a valid source
  const type = event.data && event.data.type;
  const button = event.data && event.data.button;

  if (type !== 'GOTO___ONCLICK') {
    return;
  }


  if (handlers[button]) {
    for (const handler of handlers[button]) {
      handler();
    }
  }
}));


function onButtonClick(name, callback) {
  if (!handlers[name]) {
    handlers[name] = [];
  }
  handlers[name].push(callback);
}

function showContent(url) {
  if (window.parent) {
    window.parent.postMessage({
      type: 'GOTO___SHOW_CONTENT',
      url: url
    }, '*') //TODO whitelisted origins only
  }
}

export const GoToExtensionSDK = {
  onButtonClick: onButtonClick,
  showContent: showContent,
};
