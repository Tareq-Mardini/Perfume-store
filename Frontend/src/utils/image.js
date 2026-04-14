export const getFullImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${import.meta.env.production.VITE_API_BASE_URL}${path}`;
};