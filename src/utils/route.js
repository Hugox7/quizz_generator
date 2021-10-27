export default function route(path, param) {
  const basePath = path.split(':')[0];
  return `${basePath}${param}`;
}
