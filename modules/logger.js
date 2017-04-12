module.exports = function (path, event) {
  if (!path) return 'Path is not setted';
  if (!event) return 'Event is not setted';
  let file = path.split('/');
  file = file.length > 1 ? file[file.length - 1] : file[0];
  file = file.split('.');
  if (file.length == 1) return 'Wrong file. Extension is not setted';

  const name = file[0];
  const ext = file[file.length - 1];
  const d = new Date();
  const fileStr = ext == `pdf` ? `${name}_${d.getHours()}:${d.getMinutes()}.${ext}` : `${name}.${ext}`;

  return `File ${fileStr} has been ${event}`;
};
