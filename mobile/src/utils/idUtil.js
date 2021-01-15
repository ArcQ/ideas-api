import { decode } from 'js-base64';

export const parseUuid = (relayId) => decode(relayId).split(':')[1];
