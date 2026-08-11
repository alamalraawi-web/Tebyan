const USERS_KEY = 'tebyan-users';
const SESSION_KEY = 'tebyan-session';
const LEGACY_USER_KEY = 'tebyan-user';
const LEGACY_PROFILE_KEY = 'tebyan-profile';

export function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function getUsers() {
  const users = readJson(USERS_KEY, []);
  return Array.isArray(users) ? users : [];
}

export function getSession() {
  return readJson(SESSION_KEY, null);
}

export function getCurrentUser() {
  const session = getSession();
  if (!session?.userId) return null;
  return getUsers().find((user) => user.id === session.userId) || null;
}

export function roleHome(role) {
  if (role === 'doctor') return '/doctor/dashboard';
  if (role === 'pharmacist') return '/pharmacy/dashboard';
  return '/home';
}

function saveLegacyCompatibility(user) {
  const legacy = { ...user, loggedIn: true, emailConfirmed: true };
  localStorage.setItem(LEGACY_USER_KEY, JSON.stringify(legacy));
  localStorage.setItem(LEGACY_PROFILE_KEY, JSON.stringify(legacy));
}

export function createAccount(account) {
  const users = getUsers();
  const email = account.email.trim().toLowerCase();
  if (users.some((user) => user.email === email)) {
    throw new Error('EMAIL_EXISTS');
  }

  const user = {
    id: globalThis.crypto?.randomUUID?.() || `user-${Date.now()}`,
    ...account,
    email,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  startSession(user);
  return user;
}

export function startSession(user) {
  const session = {
    userId: user.id,
    role: user.role,
    startedAt: new Date().toISOString(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  saveLegacyCompatibility(user);
  return session;
}

export function login(emailValue, password) {
  const email = emailValue.trim().toLowerCase();
  const user = getUsers().find((item) => item.email === email);
  if (!user || user.password !== password) throw new Error('INVALID_CREDENTIALS');
  startSession(user);
  return user;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  const legacy = readJson(LEGACY_USER_KEY, null);
  if (legacy) localStorage.setItem(LEGACY_USER_KEY, JSON.stringify({ ...legacy, loggedIn: false }));
}

export function updateCurrentUser(changes) {
  const current = getCurrentUser();
  if (!current) throw new Error('NO_SESSION');
  const users = getUsers().map((user) =>
    user.id === current.id ? { ...user, ...changes, updatedAt: new Date().toISOString() } : user,
  );
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  const updated = users.find((user) => user.id === current.id);
  saveLegacyCompatibility(updated);
  return updated;
}

export function migrateLegacyAccount() {
  if (getUsers().length) return;
  const legacy = readJson(LEGACY_PROFILE_KEY, null);
  if (!legacy?.email || !legacy?.role) return;
  const user = {
    id: `legacy-${Date.now()}`,
    ...legacy,
    password: legacy.password || '123456',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(USERS_KEY, JSON.stringify([user]));
}
