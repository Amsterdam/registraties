import ligplaats from './ligplaats.json';
import { makeSelectLIGNummeraanduidingId } from '../selectors';
import { initialState } from '../reducer';

describe('containers/makeSelectLIGNummeraanduidingId/selectors', () => {
  describe('makeSelectKadastraalObjectData', () => {
    it('should return undefined for an empty state', () => {
      expect(makeSelectLIGNummeraanduidingId({ data: { foo: 'bar' } })).toEqual(undefined);
      expect(makeSelectLIGNummeraanduidingId(null)).toEqual(undefined);
      expect(makeSelectLIGNummeraanduidingId(undefined)).toEqual(undefined);
    });

    it('should return the value of data', () => {
      const data = null;

      expect(makeSelectLIGNummeraanduidingId({ ligplaats: { ...initialState, data } })).toEqual(data);
    });

    it('should return null', () => {
      const data = {
        no_hoofdadres: {
          landelijk_id: 'foobarbaz',
        },
      };
      const state = { ligplaats: { ...initialState, data } };

      expect(makeSelectLIGNummeraanduidingId(state)).toEqual(null);
    });

    it('should return landelijk id', () => {
      const data = ligplaats;
      const state = { ligplaats: { ...initialState, data } };
      const landelijkId = makeSelectLIGNummeraanduidingId(state);

      expect(landelijkId).toEqual(data.hoofdadres.landelijk_id);
    });
  });
});
