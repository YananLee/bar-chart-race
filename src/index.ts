/** Open-source bar chart race. Live editor: https://livelychart.com */
export { createBarChartRace, CREDIT_LABEL, CREDIT_URL, destroy, mount } from "./engine";
export { parseData, sampleCsv } from "./parse";
export type {
  BarChartRaceHandle,
  BarChartRaceOptions,
  ChartData,
  ChartSeries,
  ChartTable,
  FontFamily,
  NumberFormat,
  RaceVariant,
  SortOrder,
} from "./types";
