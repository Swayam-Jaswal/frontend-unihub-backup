const ADMIN_USER_TYPES = new Set(['UNIVERSITY_ADMIN', 'ADMIN', 'SUPER_ADMIN']);
const APPROVER_ROLES = new Set([
  'SECRETARY',
  'VICE_PRESIDENT',
  'PRESIDENT',
  'FACULTY_ADVISOR',
  'HOD',
  'DEAN',
]);
const CLUB_LEAD_ROLES = new Set([
  'CLUB_LEAD',
  'CO_LEAD',
  'COORDINATOR',
  'TREASURER',
  'PR_HEAD',
]);
const APPROVER_PERMISSIONS = new Set([
  'APPROVE_STEP',
  'REJECT_STEP',
  'VIEW_APPROVALS',
  'VIEW_AUDIT',
  'APPROVE_BUDGET',
  'APPROVE_ECR',
]);
const CLUB_LEAD_PERMISSIONS = new Set([
  'CREATE_EVENT',
  'SUBMIT_EVENT',
  'EDIT_EVENT',
  'SUBMIT_BUDGET',
  'SUBMIT_ECR',
  'SUBMIT_SETTLEMENT',
  'MANAGE_MEMBERS',
]);

function hasMatchingValue(values, sourceSet) {
  return values.some((value) => sourceSet.has(value));
}

export function resolveDashboardAccess(user, roles = []) {
  const permissions = Array.isArray(user?.permissions) ? user.permissions : [];
  const canonicalRoles = roles
    .filter((role) => role.status !== 'REMOVED')
    .map((role) => role.canonicalRole);

  if (ADMIN_USER_TYPES.has(user?.userType)) {
    return {
      dashboardKind: 'admin',
      effectiveRoleLabel: 'Administrator',
      canonicalRoles,
      permissions,
    };
  }

  if (
    hasMatchingValue(canonicalRoles, APPROVER_ROLES) ||
    hasMatchingValue(permissions, APPROVER_PERMISSIONS)
  ) {
    return {
      dashboardKind: 'approver',
      effectiveRoleLabel: 'Approver',
      canonicalRoles,
      permissions,
    };
  }

  if (
    hasMatchingValue(canonicalRoles, CLUB_LEAD_ROLES) ||
    hasMatchingValue(permissions, CLUB_LEAD_PERMISSIONS)
  ) {
    return {
      dashboardKind: 'clubLead',
      effectiveRoleLabel: 'Club Lead',
      canonicalRoles,
      permissions,
    };
  }

  return {
    dashboardKind: 'student',
    effectiveRoleLabel: user?.userType === 'FACULTY' ? 'Faculty Member' : 'Student',
    canonicalRoles,
    permissions,
  };
}

export function formatCanonicalRole(role) {
  return role
    ?.toLowerCase()
    .split('_')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}
