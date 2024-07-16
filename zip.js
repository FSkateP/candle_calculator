const fs = require('fs');
const archiver = require('archiver');

const output = fs.createWriteStream('lambda-deployment.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Set the compression level
});

output.on('close', () => {
  console.log(`${archive.pointer()} total bytes`);
  console.log('Archiver has been finalized and the output file descriptor has closed.');
});

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.warn(err);
  } else {
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// Append files from your project directory, excluding unnecessary files
archive.glob('**/*', {
  ignore: [
    '*.log',
    '*.md',
    '.git/**',
   /// 'node_modules/**',
    'tests/**',
    'scripts/**',
    'coverage/**',
    'lambda-deployment.zip',
    '.lambdaignore'
  ]
});

archive.finalize();
