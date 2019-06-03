import * as constants from 'containers/App/constants';
import * as verblijfsobjectSelectors from 'containers/Verblijfsobject/selectors';

import { fetchData } from '../saga';

describe('saga', () => {
  describe('watchAccommodationObjectPageSaga', () => {
    it('should spawn the App saga', () => {
      expect(false).toBeTruthy();
    });
    it('should fetch data on LOAD_BAG_DATA', () => {
      expect(false).toBeTruthy();
    });
  });

  describe.only('fetchData', () => {
    const vboId = '0363010001008585';
    // const brkId = 'NL.KAD.OnroerendeZaak.11520480510035';
    // const ligId = '0363020001027057';
    const generator = fetchData({ payload: { vboId } });

    it('should reset progress', () => {
      const val = generator.next().value;

      expect(val.type).toBe('PUT');
      expect(val.payload.action.type).toBe(constants.RESET_PROGRESS);
    });

    it('should set the global status to pending', () => {
      const val = generator.next().value;

      expect(val.type).toBe('PUT');
      expect(val.payload.action.type).toBe(constants.LOAD_DATA_PENDING);
    });

    it('should reset the global error message', () => {
      const val = generator.next().value;

      expect(val.type).toBe('PUT');
      expect(val.payload.action.type).toBe(constants.RESET_GLOBAL_ERROR);
    });

    describe('VBO', () => {
      it('should set max progress count', () => {
        const {
          type,
          payload: { action },
        } = generator.next().value;

        expect(type).toBe('PUT');
        expect(action.type).toBe(constants.MAX_PROGRESS_COUNT);
        expect(action.payload).toBe(10);
      });

      it('should call fetchKadastraalObjectData generator', () => {
        const {
          type,
          payload: { fn, args },
        } = generator.next().value;

        expect(type).toBe('CALL');
        expect(fn.constructor.name).toBe('GeneratorFunction');
        expect(fn.name).toBe('fetchKadastraalObjectData');
        expect(args).toStrictEqual([vboId]);
      });

      it('should call fetchVerblijfsobjectData generator', () => {
        const {
          type,
          payload: { fn, args },
        } = generator.next().value;

        expect(type).toBe('CALL');
        expect(fn.constructor.name).toBe('GeneratorFunction');
        expect(fn.name).toBe('fetchVerblijfsobjectData');
        expect(args).toStrictEqual([vboId]);
      });

      it('should call fetchKadastraalSubjectNNPData generator', () => {
        const {
          type,
          payload: { fn, args },
        } = generator.next().value;

        expect(type).toBe('CALL');
        expect(fn.constructor.name).toBe('GeneratorFunction');
        expect(fn.name).toBe('fetchKadastraalSubjectNNPData');
        expect(args).toStrictEqual([]);
      });

      it('should call fetchKadastraalSubjectNPData generator', () => {
        const {
          type,
          payload: { fn, args },
        } = generator.next().value;

        expect(type).toBe('CALL');
        expect(fn.constructor.name).toBe('GeneratorFunction');
        expect(fn.name).toBe('fetchKadastraalSubjectNPData');
        expect(args).toStrictEqual([]);
      });

      it('should call fetchVestigingIdData generator', () => {
        const {
          type,
          payload: { fn, args },
        } = generator.next().value;

        expect(type).toBe('CALL');
        expect(fn.constructor.name).toBe('GeneratorFunction');
        expect(fn.name).toBe('fetchVestigingIdData');
        expect(args).toStrictEqual([]);
      });

      it('should call fetchMaatschappelijkeActiviteitData generator', () => {
        const {
          type,
          payload: { fn, args },
        } = generator.next().value;

        expect(type).toBe('CALL');
        expect(fn.constructor.name).toBe('GeneratorFunction');
        expect(fn.name).toBe('fetchMaatschappelijkeActiviteitData');
        expect(args).toStrictEqual([]);
      });

      it('should call fetchPandlistData generator', () => {
        const {
          type,
          payload: { fn, args },
        } = generator.next().value;

        expect(type).toBe('CALL');
        expect(fn.constructor.name).toBe('GeneratorFunction');
        expect(fn.name).toBe('fetchPandlistData');
        expect(args).toStrictEqual([vboId]);
      });

      it('should select nummeraanduiding id', () => {
        const makeSelectVBONummeraanduidingIdSpy = jest.spyOn(
          verblijfsobjectSelectors,
          'makeSelectVBONummeraanduidingId',
        );
        const { type } = generator.next().value;

        expect(type).toBe('SELECT');
        expect(makeSelectVBONummeraanduidingIdSpy).toHaveBeenCalled();
      });
    });

    describe.skip('BRK', () => {
      it('should set max progress count', () => {
        expect(false).toBeTruthy();
      });
      it('should fetch verblijfsobjectId', () => {
        expect(false).toBeTruthy();
      });
    });

    describe.skip('LIG', () => {
      it('should set max progress count', () => {
        expect(false).toBeTruthy();
      });
    });

    describe.skip('Exceptions', () => {
      it('should catch a "failed to fetch" error', () => {
        expect(false).toBeTruthy();
      });
      it('should catch a "session_expired" error', () => {
        expect(false).toBeTruthy();
      });
      it('should catch a "unauthenticated" error', () => {
        expect(false).toBeTruthy();
      });
      it('should catch a 404 error', () => {
        expect(false).toBeTruthy();
      });
      it('should catch a 500 error', () => {
        expect(false).toBeTruthy();
      });
      it('should catch a 503 error', () => {
        expect(false).toBeTruthy();
      });
      it('should catch a unknown error', () => {
        expect(false).toBeTruthy();
      });
      it('should set the global status to failed', () => {
        expect(false).toBeTruthy();
      });
    });
  });
});
