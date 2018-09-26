import axios from 'axios';
import { metricsApi } from './metricsApi';

jest.mock('axios');
describe('metricsApi', () => {
  describe('fetchStats', () => {
    it('returns nothing if there is no matching function', async () => {
      console.log('xx');
    });
    it('returns success and error count if there is a matching function', async () => {
      console.log('xx');
    });
  });
});