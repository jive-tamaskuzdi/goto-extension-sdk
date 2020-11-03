const handlers = {};

window.addEventListener('message', (event => {
  //TODO check event.origin if it's a valid source

  if (event.type !== 'GOTO___ONCLICK') {
    return;
  }


  if (handlers[event.button]) {
    for (const handler of handlers[event.button]) {
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
