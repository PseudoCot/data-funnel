import fsPromises from 'fs/promises';

export const fileExists = (path: string) => fsPromises.stat(path).then(() => true, () => false);