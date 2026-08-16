const STORAGE_KEY = "nouva_admin_events";

export const getEvents = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveEvent = (event) => {
  const events = getEvents();
  const next = [event, ...events];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
};

export const getEventById = (id) => {
  const events = getEvents();
  return events.find((item) => String(item.id) === String(id)) || null;
};

export const updateEvent = (id, updatedFields) => {
  const events = getEvents();
  const next = events.map((item) =>
    String(item.id) === String(id) ? { ...item, ...updatedFields } : item,
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
};