import { jwtDecode } from 'jwt-decode';
import { normalizeAuthUser } from '@auth/utils/normalizeAuthUser';

const AUTH_STORAGE_KEY = 'unihub.auth';

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function isTokenExpired(accessToken) {
  if (!accessToken) {
    return true;
  }

  try {
    const decoded = jwtDecode(accessToken);

    if (!decoded?.exp) {
      return false;
    }

    return decoded.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

export function loadPersistedAuth() {
  if (!isBrowser()) {
    return {
      accessToken: null,
      user: null,
      isAuthLoading: true,
    };
  }

  try {
    const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!rawValue) {
      return {
        accessToken: null,
        user: null,
        isAuthLoading: true,
      };
    }

    const parsedValue = JSON.parse(rawValue);
    const accessToken = parsedValue?.accessToken ?? null;
    const user = normalizeAuthUser(parsedValue?.user);

    if (!accessToken || !user || isTokenExpired(accessToken)) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);

      return {
        accessToken: null,
        user: null,
        isAuthLoading: true,
      };
    }

    return {
      accessToken,
      user,
      isAuthLoading: true,
    };
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);

    return {
      accessToken: null,
      user: null,
      isAuthLoading: true,
    };
  }
}

export function persistAuthState(authState) {
  if (!isBrowser()) {
    return;
  }

  const accessToken = authState?.accessToken ?? null;
  const user = normalizeAuthUser(authState?.user);

  if (!accessToken || !user || isTokenExpired(accessToken)) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      accessToken,
      user,
    }),
  );
}
