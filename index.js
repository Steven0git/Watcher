const chokidar = require('chokidar');
const { exec } = require('child_process');

function startWatcher() {
  let path = process.env.hasOwnProperty('TARGET') ? process.env.TARGET : process.env.PWD;

  const directoryPath = path || process.env.PWD;

  // Initialize watcher.
  const watcher = chokidar.watch(directoryPath, {
    persistent: true,
  });

  console.log(`Working On Directory: ${directoryPath}`);

  // Add event listeners.
  watcher
    .on('add', filePath => console.log(`File ${filePath} has been added`))
    .on('change', filePath => console.log(`File ${filePath} has been changed`))
    .on('unlink', filePath => console.log(`File ${filePath} has been deleted`))
    .on('addDir', dirPath => console.log(`Directory ${dirPath} has been added`))
    .on('unlinkDir', dirPath => console.log(`Directory ${dirPath} has been deleted`))
    .on('error', error => console.error(`Watcher error: ${error}`));

  setTimeout(clearConsole, 10000);
}

function clearConsole() {
  const command = process.platform === 'win32' ? 'cls' : 'clear';

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

// Start watching after a delay of 3 seconds.
setTimeout(startWatcher, 3000);
