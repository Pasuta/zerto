const parse = require('co-body');
const _ = require('lodash');
const watcher = require('../modules/watcher');

function *event() {
  let data = yield parse(this);
  const type = _.get(data, 'type', false);
  const path = _.get(data, 'path', false);
  if (!type || !path) return sendResponse.call(this, 'Data is wrong', 500);
  if (!_.includes(['start', 'stop'], type)) return sendResponse.call(this, 'Wrong type of event', 500);
  const w = watcher[type](data.path);
  return sendResponse.call(this, w.error || w.message, w.status);
}

function sendResponse (message, status) {
  this.status = status;
  this.type = 'json';
  this.body = status === 500 ? {error: message} : {message: message};
  return this;
}

module.exports = {event};
