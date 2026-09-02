import type { ChartData, ChartTable } from "./types";

export const sampleCsv = `Brand,2022,2023,2024,2025
Nova,42,58,76,94
Orbit,61,68,73,88
Pixel,33,52,81,86
Sage,54,64,70,79
Vela,28,49,62,74
Lumen,47,53,59,71`;

function detectDelimiter(source: string) {
  const firstLine = source.split(/\r?\n/, 1)[0] ?? "";
  return firstLine.includes("\t") && !firstLine.includes(",") ? "\t" : ",";
}

function parseDelimitedRows(source: string) {
  const delimiter = detectDelimiter(source);
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    const next = source[index + 1];

    if (character === '"') {
      if (quoted && next === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === delimiter && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      if (character === "\r" && next === "\n") index += 1;
    } else {
      cell += character;
    }
  }

  row.push(cell);
  rows.push(row);
  while (rows.length > 1 && rows[rows.length - 1]?.every((value: string) => value === "")) rows.pop();

  const width = Math.max(1, ...rows.map((item) => item.length));
  return rows.map((item) => Array.from({ length: width }, (_, index) => item[index] ?? ""));
}

export function parseData(source: ChartData): ChartTable {
  if (typeof source === "string") {
    const parsed = parseDelimitedRows(source.trim() || sampleCsv);
    const [headerRow, ...dataRows] = parsed;
    const headers = (headerRow ?? []).map((value) => value.trim());
    const rows = dataRows.map((row) => row.map((value) => value.trim())).filter((row) => row.some((value) => value));
    return { headers, rows };
  }

  if ("periods" in source && "items" in source) {
    const headers = ["Label", ...source.periods.map((period) => String(period))];
    const rows = source.items.map((item) => [
      item.label,
      ...source.periods.map((_, index) => String(item.values[index] ?? 0)),
    ]);
    return { headers, rows };
  }

  return {
    headers: source.headers.map((value) => String(value ?? "").trim()),
    rows: source.rows.map((row) => row.map((value) => String(value ?? "").trim())),
  };
}

export function asNumber(value: string | number | undefined) {
  const number = typeof value === "number" ? value : Number(String(value ?? "").replace(/[%,$\s]/g, ""));
  return Number.isFinite(number) ? number : 0;
}
