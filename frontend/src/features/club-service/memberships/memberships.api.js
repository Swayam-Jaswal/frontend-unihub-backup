import { clubApi } from '@services/axios';

export async function getMyMemberships() {
  const response = await clubApi.get('/memberships/my');
  return response.data.data;
}

export async function getPendingMemberships(clubId) {
  const response = await clubApi.get(`/memberships/club/${clubId}/pending`);
  return response.data.data;
}
