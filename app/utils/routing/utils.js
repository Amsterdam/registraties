import { URL_ROUTE_PREFIX_VBO, URL_ROUTE_PREFIX_LIG, URL_ROUTE_PREFIX_BRK } from './constants';

const getURL = object => {
  const id = extractId(object);
  if (!id) throw new Error(`Could not create url for given object ${JSON.stringify(object)}`);
  return `/${id.type}/${id.id}/`;
};

const extractId = object => {
  const { vboId, ligId, brkId } = object;

  if (vboId) {
    return { type: URL_ROUTE_PREFIX_VBO, id: vboId };
  }
  if (ligId) {
    return { type: URL_ROUTE_PREFIX_LIG, id: ligId };
  }
  if (brkId) {
    return { type: URL_ROUTE_PREFIX_BRK, id: brkId };
  }
  return undefined;
};

export { getURL, extractId };
