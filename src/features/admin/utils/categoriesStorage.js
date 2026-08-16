const STORAGE_KEY = "nouva_admin_categories";

export const getCategories = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveCategory = (category) => {
  const categories = getCategories();
  const next = [category, ...categories];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
};

export const getCategoryById = (id) => {
  const categories = getCategories();
  return categories.find((item) => String(item.id) === String(id)) || null;
};

export const updateCategory = (id, updatedFields) => {
  const categories = getCategories();
  const next = categories.map((item) =>
    String(item.id) === String(id) ? { ...item, ...updatedFields } : item,
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
};
