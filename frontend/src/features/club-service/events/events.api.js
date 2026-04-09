import { clubApi } from '@services/axios';

export async function getEvents(params = {}) {
  const response = await clubApi.get('/events', { params });
  return response.data.data;
}
