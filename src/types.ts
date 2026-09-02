export type NumberFormat = "plain" | "compact" | "percent";
export type SortOrder = "desc" | "asc" | "source";
export type FontFamily = "sans" | "serif" | "mono";
export type RaceVariant = "plain" | "flags" | "medals" | "market" | "minimal" | "ranking";

export type ChartTable = {
  headers: string[];
  rows: string[][];
};

export type ChartSeries = {
  periods: string[];
  items: { label: string; values: number[] }[];
};

export type ChartData = string | ChartTable | ChartSeries;

export type BarChartRaceOptions = {
  data: ChartData;
  title?: string;
  subtitle?: string;
  accent?: string;
  secondary?: string;
  background?: string;
  textColor?: string;
  fontFamily?: FontFamily;
  duration?: number;
  motionInterval?: number;
  startDelay?: number;
  endDelay?: number;
  showTitle?: boolean;
  showFooter?: boolean;
  showLabels?: boolean;
  showValues?: boolean;
  showRanks?: boolean;
  showPeriod?: boolean;
  showTimeline?: boolean;
  showXAxis?: boolean;
  loop?: boolean;
  rounded?: number;
  sortOrder?: SortOrder;
  itemCount?: number;
  barWidth?: number;
  barOpacity?: number;
  barStrokeWidth?: number;
  highlightLeader?: boolean;
  thousandsSeparator?: boolean;
  decimalPlaces?: number;
  numberFormat?: NumberFormat;
  shadow?: boolean;
  showTooltip?: boolean;
  variant?: RaceVariant;
  colors?: string[];
  /** Keep the LivelyChart credit link. Default true. */
  credit?: boolean;
};

export type ResolvedOptions = Required<Omit<BarChartRaceOptions, "data" | "colors">> & {
  data: ChartData;
  colors: string[];
};

export type BarChartRaceHandle = {
  play: () => void;
  pause: () => void;
  replay: () => void;
  setFrame: (frame: number) => void;
  update: (options: Partial<BarChartRaceOptions>) => void;
  destroy: () => void;
  getFrame: () => number;
  el: HTMLElement;
};
