import { raceMarker } from "./markers";
import { asNumber, parseData } from "./parse";
import { ensureStyles } from "./styles";
import type {
  BarChartRaceHandle,
  BarChartRaceOptions,
  ChartTable,
  ResolvedOptions,
} from "./types";

export const CREDIT_URL = "https://livelychart.com";
export const CREDIT_LABEL = "LivelyChart";

const DEFAULT_COLORS = ["var(--bcr-accent)", "var(--bcr-secondary)", "#ff7b63", "#4f8cff", "#f5b942", "#b66cf2"];

const defaults: Omit<ResolvedOptions, "data"> = {
  title: "Momentum, made visible",
  subtitle: "LIVE DATA STORY",
  accent: "#635bff",
  secondary: "#28b8d5",
  background: "#ffffff",
  textColor: "#353745",
  fontFamily: "sans",
  duration: 1.4,
  motionInterval: 1,
  startDelay: 0,
  endDelay: 1,
  showTitle: true,
  showFooter: true,
  showLabels: true,
  showValues: true,
  showRanks: true,
  showPeriod: true,
  showTimeline: true,
  showXAxis: true,
  loop: true,
  rounded: 8,
  sortOrder: "desc",
  itemCount: 6,
  barWidth: 100,
  barOpacity: 100,
  barStrokeWidth: 0,
  highlightLeader: false,
  thousandsSeparator: true,
  decimalPlaces: 0,
  numberFormat: "plain",
  shadow: false,
  showTooltip: true,
  variant: "plain",
  colors: DEFAULT_COLORS,
  credit: true,
};

const instances = new WeakMap<HTMLElement, Engine>();

type RowView = {
  sourceIndex: number;
  previous: number;
  root: HTMLElement;
  rank: HTMLElement;
  marker: HTMLElement;
  name: HTMLElement;
  valueNode: HTMLElement;
};

function fontStack(family: ResolvedOptions["fontFamily"]) {
  if (family === "serif") return "Georgia, 'Times New Roman', serif";
  if (family === "mono") return "ui-monospace, SFMono-Regular, Menlo, monospace";
  return "Arial, Helvetica, sans-serif";
}

function formatNumber(value: number, options: Pick<ResolvedOptions, "numberFormat" | "decimalPlaces" | "thousandsSeparator">) {
  if (options.numberFormat === "percent") return `${value.toFixed(options.decimalPlaces)}%`;
  return new Intl.NumberFormat(undefined, {
    notation: options.numberFormat === "compact" ? "compact" : "standard",
    useGrouping: options.thousandsSeparator,
    minimumFractionDigits: options.decimalPlaces,
    maximumFractionDigits: options.decimalPlaces,
  }).format(value);
}

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function el(tag: string, className?: string, text?: string) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

class Engine {
  readonly host: HTMLElement;
  private options: ResolvedOptions;
  private parsed: ChartTable;
  private frame = 0;
  private visible = true;
  private playing = true;
  private timer = 0;
  private raf = 0;
  private readyTimer = 0;
  private observer?: IntersectionObserver;
  private canvas!: HTMLElement;
  private race!: HTMLElement;
  private period?: HTMLElement;
  private axis?: HTMLElement;
  private list!: HTMLElement;
  private timeline?: HTMLElement;
  private rows: RowView[] = [];
  private numberRaf = new Map<HTMLElement, number>();

  constructor(host: HTMLElement, options: BarChartRaceOptions) {
    this.host = host;
    this.options = { ...defaults, ...options, colors: options.colors ?? DEFAULT_COLORS };
    this.parsed = parseData(this.options.data);
    this.mount();
  }

  handle(): BarChartRaceHandle {
    return {
      el: this.host,
      play: () => this.play(),
      pause: () => this.pause(),
      replay: () => this.replay(),
      setFrame: (frame) => this.setFrame(frame),
      update: (next) => this.update(next),
      destroy: () => this.destroy(),
      getFrame: () => this.frame,
    };
  }

  play() {
    this.playing = true;
    this.schedule();
  }

  pause() {
    this.playing = false;
    this.clearTimer();
  }

  replay() {
    this.frame = 0;
    this.renderFrame(true);
    if (this.options.loop) this.play();
  }

  setFrame(frame: number) {
    const count = this.frameCount();
    this.frame = ((frame % count) + count) % count;
    this.renderFrame(false);
  }

  update(next: Partial<BarChartRaceOptions>) {
    this.options = { ...this.options, ...next, colors: next.colors ?? this.options.colors };
    if (next.data) this.parsed = parseData(this.options.data);
    this.frame = 0;
    this.mount();
  }

  destroy() {
    this.pause();
    this.observer?.disconnect();
    this.numberRaf.forEach((id) => window.cancelAnimationFrame(id));
    this.numberRaf.clear();
    this.host.replaceChildren();
    instances.delete(this.host);
  }

  private frameCount() {
    return Math.max(1, this.parsed.headers.length - 1);
  }

  private mount() {
    ensureStyles();
    this.clearTimer();
    window.clearTimeout(this.readyTimer);
    this.observer?.disconnect();
    this.numberRaf.forEach((id) => window.cancelAnimationFrame(id));
    this.numberRaf.clear();
    this.host.replaceChildren();
    this.period = undefined;
    this.axis = undefined;
    this.timeline = undefined;

    const o = this.options;
    this.canvas = el("div", `bcr-canvas${o.shadow ? " has-shadow" : ""}`);
    this.canvas.style.setProperty("--bcr-accent", o.accent);
    this.canvas.style.setProperty("--bcr-secondary", o.secondary);
    this.canvas.style.setProperty("--bcr-background", o.background);
    this.canvas.style.setProperty("--bcr-text", o.textColor);
    this.canvas.style.setProperty("--bcr-duration", `${o.duration}s`);
    this.canvas.style.setProperty("--bcr-start-delay", `${o.startDelay}s`);
    this.canvas.style.setProperty("--bcr-radius", `${o.rounded}px`);
    this.canvas.style.setProperty("--bcr-font", fontStack(o.fontFamily));
    this.canvas.style.setProperty("--bcr-bar-opacity", String(o.barOpacity / 100));
    this.canvas.style.setProperty("--bcr-bar-width", String(o.barWidth / 100));
    this.canvas.style.setProperty("--bcr-stroke-width", `${o.barStrokeWidth}px`);
    this.canvas.dataset.livelychart = CREDIT_URL;

    if (o.showTitle) {
      const heading = el("header", "bcr-heading");
      heading.append(el("span", undefined, o.subtitle), el("h3", undefined, o.title));
      this.canvas.append(heading);
    }

    const visual = el("div", "bcr-visual");
    const ranking = o.variant === "ranking";
    this.race = el("div", `bcr-race bcr-variant-${ranking ? "plain" : o.variant}${ranking ? " bcr-ranking" : ""}`);
    this.list = el("div", "bcr-list");
    this.race.append(this.list);
    visual.append(this.race);
    this.canvas.append(visual);

    if (o.showFooter || o.credit) {
      const footer = el("footer", "bcr-footer");
      if (o.credit) {
        const credit = document.createElement("a");
        credit.className = "bcr-credit";
        credit.href = CREDIT_URL;
        credit.target = "_blank";
        credit.rel = "noopener";
        credit.textContent = CREDIT_LABEL;
        footer.append(credit);
      }
      footer.append(el("i"), el("span", undefined, "PLAY THE NUMBERS"));
      this.canvas.append(footer);
    }

    this.host.append(this.canvas);
    this.buildRows();
    this.renderFrame(true);
    this.observe();
    this.armReady();
    if (o.loop) this.play();
  }

  private buildRows() {
    const items = this.parsed.rows.slice(0, this.options.itemCount);
    this.race.style.setProperty("--bcr-count", String(Math.max(1, items.length)));
    this.list.replaceChildren();
    this.rows = items.map((row, sourceIndex) => {
      const root = el("div", "bcr-row");
      const rank = el("span", "bcr-rank");
      const strong = el("strong");
      const marker = el("span", "bcr-marker");
      const name = el("span", "bcr-label");
      const track = el("i");
      track.append(el("b"));
      const valueNode = el("em");
      strong.append(marker, name);
      root.append(rank, strong, track, valueNode);
      this.list.append(root);
      return { sourceIndex, previous: asNumber(row[1]), root, rank, marker, name, valueNode };
    });
  }

  private renderFrame(resetNumbers: boolean) {
    const o = this.options;
    const values = this.rows.map((row) => {
      const source = this.parsed.rows[row.sourceIndex] ?? [];
      return {
        row,
        label: source[0] || "Item",
        value: asNumber(source[this.frame + 1]),
      };
    });
    const ordered = o.sortOrder === "source"
      ? [...values]
      : [...values].sort((a, b) => (o.sortOrder === "asc" ? a.value - b.value : b.value - a.value));
    const ranks = new Map(ordered.map((item, rank) => [item.row.sourceIndex, rank]));
    const max = Math.max(...values.map((item) => item.value), 1);
    const period = this.parsed.headers[this.frame + 1] || this.parsed.headers[1] || "Now";
    const showMarker = o.variant !== "plain" && o.variant !== "minimal" && o.variant !== "ranking";

    if (o.showPeriod) {
      if (!this.period || this.period.textContent !== period) {
        this.period?.remove();
        this.period = el("div", "bcr-period", period);
        this.race.prepend(this.period);
      }
    } else {
      this.period?.remove();
      this.period = undefined;
    }

    if (o.showXAxis) {
      if (!this.axis) {
        this.axis = el("div", "bcr-axis");
        this.race.append(this.axis);
      }
      this.axis.replaceChildren(
        el("span", undefined, "0"),
        el("span", undefined, formatNumber(max / 2, o)),
        el("span", undefined, formatNumber(max, o)),
      );
    } else {
      this.axis?.remove();
      this.axis = undefined;
    }

    values.forEach((item) => {
      const rank = ranks.get(item.row.sourceIndex) ?? item.row.sourceIndex;
      const scale = Math.max(0.07, item.value / max);
      const tone = o.colors[item.row.sourceIndex % o.colors.length] ?? DEFAULT_COLORS[0];
      item.row.root.classList.toggle("is-leader", o.highlightLeader && rank === 0);
      item.row.root.style.setProperty("--bcr-row-offset", `${rank * 100}%`);
      item.row.root.style.setProperty("--bcr-bar-scale", String(scale));
      item.row.root.style.setProperty("--bcr-tone", tone);
      item.row.root.title = o.showTooltip ? `${item.label}: ${formatNumber(item.value, o)}` : "";

      if (o.showRanks) {
        const nextRank = String(rank + 1).padStart(2, "0");
        if (item.row.rank.textContent !== nextRank) {
          const next = el("span", "bcr-rank", nextRank);
          item.row.rank.replaceWith(next);
          item.row.rank = next;
        }
      } else {
        item.row.rank.textContent = "";
      }

      item.row.marker.hidden = !showMarker;
      if (showMarker) item.row.marker.textContent = raceMarker(item.label, rank, o.variant);
      item.row.name.textContent = o.showLabels ? item.label : "";
      if (o.showValues) {
        const from = resetNumbers ? item.value : item.row.previous;
        this.animateNumber(item.row.valueNode, from, item.value, o);
      } else {
        item.row.valueNode.textContent = "";
      }
      item.row.previous = item.value;
    });

    const count = this.frameCount();
    if (o.showTimeline && count > 1) {
      if (!this.timeline) {
        this.timeline = el("div", "bcr-timeline");
        this.timeline.setAttribute("aria-label", "Timeline");
        this.race.append(this.timeline);
      }
      this.timeline.replaceChildren(
        ...this.parsed.headers.slice(1).map((header, index) => {
          const tick = el("i", index <= this.frame ? "active" : "");
          tick.title = header;
          return tick;
        }),
      );
    } else {
      this.timeline?.remove();
      this.timeline = undefined;
    }
  }

  private animateNumber(
    target: HTMLElement,
    from: number,
    to: number,
    options: Pick<ResolvedOptions, "duration" | "numberFormat" | "decimalPlaces" | "thousandsSeparator">,
  ) {
    const prev = this.numberRaf.get(target);
    if (prev) window.cancelAnimationFrame(prev);
    if (from === to || reducedMotion()) {
      target.textContent = formatNumber(to, options);
      return;
    }
    const startedAt = performance.now();
    const durationMs = Math.max(420, options.duration * 820);
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / durationMs);
      const eased = 1 - (1 - progress) ** 4;
      target.textContent = formatNumber(from + (to - from) * eased, options);
      if (progress < 1) this.numberRaf.set(target, window.requestAnimationFrame(tick));
      else this.numberRaf.delete(target);
    };
    this.numberRaf.set(target, window.requestAnimationFrame(tick));
  }

  private observe() {
    if (typeof IntersectionObserver === "undefined") return;
    this.observer = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      if (this.visible && this.playing && this.options.loop) this.schedule();
      else this.clearTimer();
    }, { rootMargin: "120px", threshold: 0.01 });
    this.observer.observe(this.canvas);
  }

  private armReady() {
    this.race.classList.remove("is-ready");
    this.readyTimer = window.setTimeout(() => {
      this.raf = window.requestAnimationFrame(() => this.race.classList.add("is-ready"));
    }, this.options.startDelay * 1_000);
  }

  private schedule() {
    this.clearTimer();
    if (!this.playing || !this.options.loop || this.frameCount() <= 1 || !this.visible) return;
    const interval = Math.max(600, (this.options.duration + this.options.motionInterval + this.options.endDelay) * 1_000);
    this.timer = window.setTimeout(() => {
      this.raf = window.requestAnimationFrame(() => {
        if (document.visibilityState === "visible") {
          this.frame = (this.frame + 1) % this.frameCount();
          this.renderFrame(false);
        }
        this.schedule();
      });
    }, interval);
  }

  private clearTimer() {
    window.clearTimeout(this.timer);
    window.cancelAnimationFrame(this.raf);
    this.timer = 0;
    this.raf = 0;
  }
}

export function mount(target: string | HTMLElement, options: BarChartRaceOptions): BarChartRaceHandle {
  const host = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!host) throw new Error("BarChartRace: target not found");
  instances.get(host)?.destroy();
  const engine = new Engine(host, options);
  instances.set(host, engine);
  return engine.handle();
}

export function destroy(target: string | HTMLElement) {
  const host = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!host) return;
  instances.get(host)?.destroy();
}

export function createBarChartRace(target: string | HTMLElement, options: BarChartRaceOptions) {
  return mount(target, options);
}
