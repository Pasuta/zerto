const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
const logger = require('./logger');
let watcher;

function start(path) {

  const fullPath = `${process.cwd()}/${path}`;
  if (!fs.existsSync(fullPath)) return { status: 500, error: `Path ${path} is not exists` };

  watcher = chokidar.watch(fullPath, {});

  const log = console.log.bind(console);

  watcher
    .on('add', path => log(logger(path, 'added')))
    .on('change', path => log(logger(path, 'changed')))
    .on('unlink', path => log(logger(path, 'unlinked')));

  return { status: 200, message: `Path ${path} has been successfully added to watcher` }
}

function stop(path) {
  const fullPath = `${process.cwd()}/${path}`;
  const watchedPaths = watcher.getWatched();
  if (!Object.keys(watchedPaths).length) return { status: 500, message: `Watcher is empty` };
  if (!watchedPaths[fullPath]) return { status: 500, error: `Path ${path} is not listening` };
  watcher.unwatch(fullPath);
  watcher.close();
  return { status: 200, message: `Path ${path} has been successfully removed from watcher` };
}

module.exports = {start, stop};
