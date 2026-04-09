import { clubApi } from '@services/axios';

export async function getUpcomingEvents(limit = 6) {
  const response = await clubApi.get('/discover/events', {
    params: { limit },
  });

  return response.data.data;
}

export async function getClubs(limit = 6) {
  const response = await clubApi.get('/discover/clubs', {
    params: { limit },
  });

  return response.data.data;
}

export async function getSocieties() {
  const response = await clubApi.get('/discover/societies');
  return response.data.data;
}
