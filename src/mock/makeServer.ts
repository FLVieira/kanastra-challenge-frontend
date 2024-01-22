import { createServer } from 'miragejs';

import { config } from '@/config';
import { mockChargeFilesRoutes } from './files';

export const makeServer = ({ environment = 'development' } = {}) => {
  return createServer({
    environment,
    routes() {
      this.urlPrefix = config.API_BASE_URL;
      mockChargeFilesRoutes(this);
    },
  });
};
