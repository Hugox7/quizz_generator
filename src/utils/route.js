export function route(path, param) {
  const basePath = path.split(':')[0];
  return `${basePath}${param}`;
}

export function routeWithParams(path, params) {
  const splitPath = path.split('/');
  const outputPath = [];
  splitPath.forEach(el => {
    if (el.startsWith(':')) {
      const param =  params[el.substring(1)];
      if (!param) {
        throw new Error('Missing param in params object');
      }
      outputPath.push(param);
    } else {
      outputPath.push(el);
    }
  });
  return outputPath.join('/');
}
