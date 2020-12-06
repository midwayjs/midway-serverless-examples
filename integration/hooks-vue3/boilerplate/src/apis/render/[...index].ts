import { withController } from '@midwayjs/hooks';

export default withController(
  {
    middleware: ['fmw:staticFile'],
  },
  async () => {
    return 'Building... Please refresh this page later.';
  }
);
