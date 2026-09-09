const { contextBridge, ipcRenderer } = require('electron');

// Expose safe, structured APIs to the renderer process
contextBridge.exposeInMainWorld('api', {
  saveClient: (client) => ipcRenderer.invoke('db:save-client', client),
  getClients: () => ipcRenderer.invoke('db:get-clients'),
  deleteClient: (id) => ipcRenderer.invoke('db:delete-client', id),
  fetchUrl: (url) => ipcRenderer.invoke('net:fetch-url', url),
  captureUrl: (options) => ipcRenderer.invoke('screen:capture-url', options)
});
