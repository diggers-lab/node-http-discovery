const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, "../", 'dist', 'cjs');
console.log('directoryPath :>> ', directoryPath);

function processDirectory(directory) {
    fs.readdir(directory, (err, items) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        items.forEach((item) => {
            const itemPath = path.join(directory, item);
            fs.stat(itemPath, (err, stats) => {
                if (err) {
                    return console.log('Unable to stat item: ' + err);
                }

                if (stats.isDirectory()) {
                    processDirectory(itemPath);
                } else if (path.extname(item) === '.js') {
                    const newFilePath = path.join(directory, path.basename(item, '.js') + '.cjs');

                    fs.readFile(itemPath, 'utf8', (err, data) => {
                        if (err) {
                            return console.log('Unable to read file: ' + err);
                        }

                        // const result = data.replace(/\.js'/g, ".cjs'");
                        // update all imports from "file" without extensions to "file.cjs"
                        const result = data.replace(/(require\s*\(\s*['"])([^'"]+)(['"]\s*\))/g, (match, p1, p2, p3) => {
                            if (p2.endsWith('.js')) {
                                return p1 + p2.slice(0, -3) + '.cjs' + p3;
                            } else if (!p2.endsWith('.cjs')) {
                                return p1 + p2 + '.cjs' + p3;
                            }
                        });


                        fs.writeFile(itemPath, result, 'utf8', (err) => {
                            if (err) return console.log('Unable to write file: ' + err);

                            fs.rename(itemPath, newFilePath, (err) => {
                                if (err) return console.log('Unable to rename file: ' + err);
                                console.log(`Renamed ${itemPath} to ${newFilePath}`);
                            });
                        });
                    });
                }
            });
        });
    });
}

processDirectory(directoryPath);