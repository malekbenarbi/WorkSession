const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Expose Electron APIs here
});
