import { clubApi } from '@services/axios';

export async function getUserAuditHistory(userId, limit = 5) {
  const response = await clubApi.get(`/audit/user/${userId}`, {
    params: { limit },
  });

  return response.data.data;
}

export async function getAuditFeed(limit = 6) {
  const response = await clubApi.get('/audit/feed', {
    params: { limit },
  });

  return response.data.data;
}
