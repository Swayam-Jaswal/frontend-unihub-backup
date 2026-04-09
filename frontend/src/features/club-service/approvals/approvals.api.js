import { clubApi } from '@services/axios';

export async function getApprovalDashboard() {
  const response = await clubApi.get('/approvals/dashboard');
  return response.data.data;
}
