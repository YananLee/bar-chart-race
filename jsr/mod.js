/* @ts-self-types="./mod.d.ts" */
const escapeXml = (v) => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'})[c]);
/** Render labeled bars as a lightweight SVG chart. */
export function renderBars(data, { width = 800, color = '#4f46e5' } = {}) {
  if (!Array.isArray(data) || data.length < 1 || data.length > 20 || data.some(x => !x || !String(x.label).trim() || !Number.isFinite(x.value) || x.value < 0)) throw new TypeError('provide 1 to 20 nonnegative bars');
  if (!Number.isInteger(width) || width < 300 || !/^#[0-9a-fA-F]{6}$/.test(color)) throw new TypeError('invalid options');
  const height = data.length * 48 + 32; const max = Math.max(...data.map(x => x.value), 1);
  const bars = data.map((x,i) => { const y = i * 48 + 16; const w = Math.round((width - 200) * x.value / max); return `<text x="16" y="${y+25}" font-family="Arial,sans-serif" font-size="16">${escapeXml(x.label)}</text><rect x="150" y="${y}" width="${w}" height="32" rx="4" fill="${color}"/><text x="${158+w}" y="${y+23}" font-family="Arial,sans-serif" font-size="14">${x.value}</text>`; }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Bar chart"><rect width="100%" height="100%" fill="#ffffff"/>${bars}</svg>`;
}
