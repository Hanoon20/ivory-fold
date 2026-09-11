import mohammedMaryam from './mohammed-maryam';
import aqeelHana from './aqeel-hana';

export const weddings = {
  'mohammed-maryam': mohammedMaryam,
  'aqeel-hana': aqeelHana,
};

export const DEFAULT_WEDDING = 'mohammed-maryam';

export function getWedding(slug) {
  return weddings[slug] || weddings[DEFAULT_WEDDING];
}
