window.GoToExtensionSDK = (() => {
  const handlers = {};

  window.addEventListener('message', (event => {
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

  return {
    onButtonClick: onButtonClick
  }
});
