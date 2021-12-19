/**
 * Deep Copy
 *
 * @param  {any} data data which want to copy deeply
 * @return {any} data after deep copy
 */
export function deepCopy(data: any): any {
  return JSON.parse(JSON.stringify(data))
}
