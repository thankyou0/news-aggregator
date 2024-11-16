const { exec } = require('child_process');

exec('where chrome', (err, stdout, stderr) => {
    if (err) {
        console.error('Error finding chrome.exe:', err.message);
        return;
    }

    if (stderr) {
        console.error('Error output:', stderr);
        return;
    }

    console.log('Path to chrome.exe:', stdout.trim());
});
