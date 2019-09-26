import { URL_ROUTE_PREFIX_VBO, URL_ROUTE_PREFIX_LIG, URL_ROUTE_PREFIX_BRK } from './constants';

export function getURL(object) {
  const { vboId, ligId, brkId } = object;

  if (vboId) {
    return `/${URL_ROUTE_PREFIX_VBO}/${vboId}/`;
  }
  if (ligId) {
    return `/${URL_ROUTE_PREFIX_LIG}/${ligId}/`;
  }
  if (brkId) {
    return `/${URL_ROUTE_PREFIX_BRK}/${brkId}/`;
  }

  throw new Error(`Could not create url for given object ${object}`);
}
