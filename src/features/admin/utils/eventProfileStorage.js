const STORAGE_KEY = "nouva_admin_event_profiles";

const getAllProfiles = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const getProfileByEventId = (eventId) => {
  const all = getAllProfiles();
  return all[eventId] || null;
};

export const saveProfileForEvent = (eventId, profileData) => {
  const all = getAllProfiles();
  all[eventId] = { ...(all[eventId] || {}), ...profileData };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return all[eventId];
};