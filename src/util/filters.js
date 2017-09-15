function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return `${time + label}s`;
}

function round(number) {
  // eslint-disable-next-line no-bitwise
  return ~~number;
}

function host(url) {
  const hostAddress = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const parts = hostAddress.split('.').slice(-3);
  if (parts[0] === 'www') parts.shift();
  return parts.join('.');
}

function timeAgo(time) {
  const between = (Date.now() / 1000) - Number(time);
  if (between < 3600) {
    return pluralize(round(between / 60), ' minute');
  } else if (between < 86400) {
    return pluralize(round(between / 3600), ' hour');
  }
  return pluralize(round(between / 86400), ' day');
}

export { host, timeAgo };
