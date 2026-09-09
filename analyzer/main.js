import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 850,
    minWidth: 1000,
    minHeight: 700,
    title: "RetroFit Audit & Contract Suite",
    backgroundColor: '#09090b',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false // set sandbox false to allow preload require/contextBridge in older/packaged Electron environments
    }
  });

  // Hide default menu bar
  mainWindow.setMenuBarVisibility(false);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ==========================================
// Local JSON File Database Logic
// ==========================================

const getDbPath = () => {
  const userDataPath = app.getPath('userData');
  return path.join(userDataPath, 'clients.json');
};

const readDatabase = () => {
  const dbPath = getDbPath();
  if (!fs.existsSync(dbPath)) {
    return [];
  }
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading database file, resetting to empty', err);
    return [];
  }
};

const writeDatabase = (data) => {
  const dbPath = getDbPath();
  try {
    // Ensure dir exists
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing database file', err);
    return false;
  }
};

// ==========================================
// IPC Database Route Handlers
// ==========================================

ipcMain.handle('db:get-clients', async () => {
  return readDatabase();
});

ipcMain.handle('db:save-client', async (event, client) => {
  const database = readDatabase();
  let clientToSave = { ...client };
  
  if (!clientToSave.url) {
    throw new Error('Client domain URL is required to save a record.');
  }

  // Match by id if present, or fallback to domain URL
  let existingIndex = -1;
  if (clientToSave.id) {
    existingIndex = database.findIndex(c => c.id === clientToSave.id);
  } else {
    existingIndex = database.findIndex(c => c.url.toLowerCase() === clientToSave.url.toLowerCase());
  }

  if (existingIndex !== -1) {
    // Merge updates, preserving id and original timestamp
    clientToSave.id = database[existingIndex].id;
    clientToSave.createdAt = database[existingIndex].createdAt || new Date().toISOString();
    database[existingIndex] = clientToSave;
  } else {
    // Assign a new auto-incremented ID and timestamp
    const maxId = database.reduce((max, c) => (c.id > max ? c.id : max), 0);
    clientToSave.id = maxId + 1;
    clientToSave.createdAt = new Date().toISOString();
    database.push(clientToSave);
  }

  const success = writeDatabase(database);
  if (!success) {
    throw new Error('Failed to write client record to local JSON database.');
  }
  return clientToSave;
});

ipcMain.handle('db:delete-client', async (event, id) => {
  const database = readDatabase();
  const filtered = database.filter(c => c.id !== id);
  if (filtered.length === database.length) {
    return false;
  }
  return writeDatabase(filtered);
});

ipcMain.handle('net:fetch-url', async (event, url) => {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      signal: AbortSignal.timeout(6000)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (err) {
    console.error(`Error fetching URL ${url}:`, err);
    throw err;
  }
});

// Capture URL as high-res screenshot (Desktop or Mobile)
ipcMain.handle('screen:capture-url', async (event, { url, width = 1440, height = 900, mobile = false }) => {
  let targetUrl = url;
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = 'https://' + targetUrl;
  }

  const captureWin = new BrowserWindow({
    width: width,
    height: height,
    show: false,
    webPreferences: {
      offscreen: true,
      images: true,
      webSecurity: false
    }
  });

  if (mobile) {
    captureWin.webContents.setUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
    );
  }

  try {
    await captureWin.loadURL(targetUrl, { timeout: 15000 });
    // Wait for initial render and web fonts to settle
    await new Promise(resolve => setTimeout(resolve, 1500));
    const image = await captureWin.webContents.capturePage({ x: 0, y: 0, width, height });
    const dataUrl = image.toDataURL();
    captureWin.destroy();
    return dataUrl;
  } catch (err) {
    if (!captureWin.isDestroyed()) {
      captureWin.destroy();
    }
    console.error(`Error capturing screenshot for ${targetUrl}:`, err);
    throw new Error(`Screenshot capture failed: ${err.message}`);
  }
});

// ==========================================
// App Lifecycle
// ==========================================

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
