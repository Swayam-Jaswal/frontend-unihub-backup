import { clubApi } from '@services/axios';

export async function getRolesForUser(userId) {
  const response = await clubApi.get(`/roles/user/${userId}`);
  return response.data.data;
}
