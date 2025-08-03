import { APP_CONSTANTS } from '../constants/core.constant';

export const getTitle = (title: string = '') => {
  return title ? `${title} - ${APP_CONSTANTS.APP_NAME}` : APP_CONSTANTS.APP_NAME;
};
