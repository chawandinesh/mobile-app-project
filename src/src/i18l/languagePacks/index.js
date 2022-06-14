// export { default as enGB } from './en-GB.js';
// export { default as enZA } from './en-ZA.js';
// export { default as deDE } from './de-DE.js';
// export { default as arAE } from './ar-AE.js';
import { enGB } from './en-GB';

const createLanguagePack = (prefix, data) => {
  return Object.entries(data).reduce((acc, entries) => {
    acc[entries[0]] = `${prefix} ${entries[1]}`;
    return acc;
  }, {});
};
const enZA = createLanguagePack('[en-ZA]', enGB);
const deDE = createLanguagePack('[de-DE]', enGB);
const arAE = createLanguagePack('[arAE]', enGB);

export { enGB, deDE, arAE, enZA };
