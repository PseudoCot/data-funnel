export function compareObjectsByKeyCreator(key: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (a: { [key: string]: any }, b: { [key: string]: any }) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  }
}