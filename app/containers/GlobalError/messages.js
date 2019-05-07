/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage component.
 */
import { defineMessages } from 'react-intl';
import { scope } from '../../i18n';

export default defineMessages({
  unable_to_fetch: {
    id: `${scope}.unable_to_fetch`,
  },
  unauthorized: {
    id: `${scope}.unauthorized`,
  },
  session_expired: {
    id: `${scope}.session_expired`,
  },
});
