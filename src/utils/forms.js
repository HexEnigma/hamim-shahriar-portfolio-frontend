export function toFormData(obj) {
  const fd = new FormData();
  Object.entries(obj).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (Array.isArray(v)) v.forEach((i) => fd.append(k, i));
    else if (typeof v === "boolean") fd.append(k, v ? "true" : "false");
    else fd.append(k, v);          // File, string or number
  });
  return fd;
}

/** JSON when there is no file, multipart when there is. Clears emptied many-to-many fields afterwards. */
export async function saveWithFiles(api, id, values, files = {}, manyKeys = []) {
  const hasFile = Object.values(files).some(Boolean);
  const body = hasFile ? toFormData({ ...values, ...files }) : values;
  let res = id ? await api.update(id, body) : await api.create(body);
  if (hasFile && id) {
    const empty = manyKeys.filter((k) => Array.isArray(values[k]) && values[k].length === 0);
    if (empty.length) res = await api.update(id, Object.fromEntries(empty.map((k) => [k, []])));
  }
  return res;
}

/** First DRF field error, e.g. the "content" message when publishing a too-short post. */
export function firstFieldError(error) {
  const data = error?.response?.data;
  if (!data || typeof data !== "object") return null;
  const v = Object.values(data)[0];
  return Array.isArray(v) ? v[0] : typeof v === "string" ? v : null;
}