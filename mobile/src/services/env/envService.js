import { map } from 'ramda';

import uuidv1 from 'uuid/v1';
import { activateKeepAwake } from 'expo-keep-awake';

import config from '../../config.json';
import configProd from '../../config.production.json';

const handleRandomValues = (v, vars) => {
  if (v === 'randomEmail') {
    return `${vars.gmail}+${uuidv1().split('-')[0]}@gmail.com`;
  }
  if (v === 'randomUser') {
    return `${vars.user}+${uuidv1().split('-')[0]}`;
  }
  return v;
};

export default {
  init() {
    // eslint-disable-next-line
    if (__DEV__) {
      activateKeepAwake();
    }
  },
  getConfig() {
    // eslint-disable-next-line
    if (__DEV__) {
      return config;
    }
    return configProd;
  },
  getDefaultValues(k) {
    if (!this.getConfig()?.useDefaultValues) {
      return {};
    }
    return map(
      (v) => handleRandomValues(v, !this.getConfig()?.defaultValues.vars),
      this.getConfig()?.defaultValues?.[k] || {},
    );
  },
};
