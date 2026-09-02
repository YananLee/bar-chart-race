"use strict";
var BarChartRace = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    CREDIT_LABEL: () => CREDIT_LABEL,
    CREDIT_URL: () => CREDIT_URL,
    createBarChartRace: () => createBarChartRace,
    destroy: () => destroy,
    mount: () => mount,
    parseData: () => parseData,
    sampleCsv: () => sampleCsv
  });

  // src/markers.ts
  var FLAGS = {
    "United States": "\u{1F1FA}\u{1F1F8}",
    "\u7F8E\u56FD": "\u{1F1FA}\u{1F1F8}",
    "\u7C73\u56FD": "\u{1F1FA}\u{1F1F8}",
    "\uBBF8\uAD6D": "\u{1F1FA}\u{1F1F8}",
    "Estados Unidos": "\u{1F1FA}\u{1F1F8}",
    China: "\u{1F1E8}\u{1F1F3}",
    "\u4E2D\u56FD": "\u{1F1E8}\u{1F1F3}",
    "\uC911\uAD6D": "\u{1F1E8}\u{1F1F3}",
    "Chine": "\u{1F1E8}\u{1F1F3}",
    "Cina": "\u{1F1E8}\u{1F1F3}",
    Japan: "\u{1F1EF}\u{1F1F5}",
    "\u65E5\u672C": "\u{1F1EF}\u{1F1F5}",
    "\uC77C\uBCF8": "\u{1F1EF}\u{1F1F5}",
    "Jap\xF3n": "\u{1F1EF}\u{1F1F5}",
    "Jap\xE3o": "\u{1F1EF}\u{1F1F5}",
    "Japon": "\u{1F1EF}\u{1F1F5}",
    Germany: "\u{1F1E9}\u{1F1EA}",
    "\u5FB7\u56FD": "\u{1F1E9}\u{1F1EA}",
    "\u30C9\u30A4\u30C4": "\u{1F1E9}\u{1F1EA}",
    "\uB3C5\uC77C": "\u{1F1E9}\u{1F1EA}",
    "Alemania": "\u{1F1E9}\u{1F1EA}",
    "Deutschland": "\u{1F1E9}\u{1F1EA}",
    "United Kingdom": "\u{1F1EC}\u{1F1E7}",
    "\u82F1\u56FD": "\u{1F1EC}\u{1F1E7}",
    "\uC601\uAD6D": "\u{1F1EC}\u{1F1E7}",
    "Reino Unido": "\u{1F1EC}\u{1F1E7}",
    "Royaume-Uni": "\u{1F1EC}\u{1F1E7}",
    France: "\u{1F1EB}\u{1F1F7}",
    "\u6CD5\u56FD": "\u{1F1EB}\u{1F1F7}",
    "\u30D5\u30E9\u30F3\u30B9": "\u{1F1EB}\u{1F1F7}",
    "\uD504\uB791\uC2A4": "\u{1F1EB}\u{1F1F7}",
    "Francia": "\u{1F1EB}\u{1F1F7}",
    "Fran\xE7a": "\u{1F1EB}\u{1F1F7}",
    India: "\u{1F1EE}\u{1F1F3}",
    "\u5370\u5EA6": "\u{1F1EE}\u{1F1F3}",
    "\u30A4\u30F3\u30C9": "\u{1F1EE}\u{1F1F3}",
    "\uC778\uB3C4": "\u{1F1EE}\u{1F1F3}",
    "\xCDndia": "\u{1F1EE}\u{1F1F3}",
    Italy: "\u{1F1EE}\u{1F1F9}",
    "\u610F\u5927\u5229": "\u{1F1EE}\u{1F1F9}",
    "\u30A4\u30BF\u30EA\u30A2": "\u{1F1EE}\u{1F1F9}",
    "\uC774\uD0C8\uB9AC\uC544": "\u{1F1EE}\u{1F1F9}",
    "Italia": "\u{1F1EE}\u{1F1F9}",
    "It\xE1lia": "\u{1F1EE}\u{1F1F9}",
    Brazil: "\u{1F1E7}\u{1F1F7}",
    "\u5DF4\u897F": "\u{1F1E7}\u{1F1F7}",
    Canada: "\u{1F1E8}\u{1F1E6}",
    "\u52A0\u62FF\u5927": "\u{1F1E8}\u{1F1E6}",
    Australia: "\u{1F1E6}\u{1F1FA}",
    "\u6FB3\u5927\u5229\u4E9A": "\u{1F1E6}\u{1F1FA}",
    Korea: "\u{1F1F0}\u{1F1F7}",
    "\u97E9\u56FD": "\u{1F1F0}\u{1F1F7}",
    "South Korea": "\u{1F1F0}\u{1F1F7}",
    Spain: "\u{1F1EA}\u{1F1F8}",
    "\u897F\u73ED\u7259": "\u{1F1EA}\u{1F1F8}"
  };
  function raceMarker(label, rank, variant) {
    if (variant === "medals") return ["\u{1F947}", "\u{1F948}", "\u{1F949}"][rank] ?? String(rank + 1);
    if (variant === "flags") return FLAGS[label] ?? label.slice(0, 2).toUpperCase();
    return label.slice(0, 1).toUpperCase();
  }

  // src/parse.ts
  var sampleCsv = `Brand,2022,2023,2024,2025
Nova,42,58,76,94
Orbit,61,68,73,88
Pixel,33,52,81,86
Sage,54,64,70,79
Vela,28,49,62,74
Lumen,47,53,59,71`;
  function detectDelimiter(source) {
    const firstLine = source.split(/\r?\n/, 1)[0] ?? "";
    return firstLine.includes("	") && !firstLine.includes(",") ? "	" : ",";
  }
  function parseDelimitedRows(source) {
    const delimiter = detectDelimiter(source);
    const rows = [];
    let row = [];
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
    while (rows.length > 1 && rows[rows.length - 1]?.every((value) => value === "")) rows.pop();
    const width = Math.max(1, ...rows.map((item) => item.length));
    return rows.map((item) => Array.from({ length: width }, (_, index) => item[index] ?? ""));
  }
  function parseData(source) {
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
        ...source.periods.map((_, index) => String(item.values[index] ?? 0))
      ]);
      return { headers, rows };
    }
    return {
      headers: source.headers.map((value) => String(value ?? "").trim()),
      rows: source.rows.map((row) => row.map((value) => String(value ?? "").trim()))
    };
  }
  function asNumber(value) {
    const number = typeof value === "number" ? value : Number(String(value ?? "").replace(/[%,$\s]/g, ""));
    return Number.isFinite(number) ? number : 0;
  }

  // src/styles.ts
  var STYLE_ID = "bar-chart-race-styles";
  var CSS = `
.bcr-canvas {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: var(--bcr-background);
  color: var(--bcr-text);
  padding: 5% 6%;
  overflow: hidden;
  border-radius: var(--bcr-radius);
  display: flex;
  flex-direction: column;
  container-type: inline-size;
  contain: layout paint style;
  isolation: isolate;
  font-family: var(--bcr-font);
  box-sizing: border-box;
}
.bcr-canvas *, .bcr-canvas *::before, .bcr-canvas *::after { box-sizing: border-box; }
.bcr-canvas.has-shadow::after {
  content: "";
  position: absolute;
  inset: 2%;
  z-index: -1;
  border-radius: inherit;
  box-shadow: 0 18px 45px color-mix(in srgb, var(--bcr-text) 25%, transparent);
}
.bcr-heading { position: relative; z-index: 2; }
.bcr-heading span {
  color: color-mix(in srgb, var(--bcr-text) 54%, transparent);
  font-size: clamp(7px, 1.2cqw, 13px);
  font-weight: 800;
  letter-spacing: 1.5px;
}
.bcr-heading h3 {
  margin: .5% 0 0;
  font-size: clamp(14px, 3.5cqw, 36px);
  line-height: 1;
  letter-spacing: -.04em;
  font-weight: 800;
}
.bcr-visual { position: relative; flex: 1; min-height: 0; display: flex; align-items: stretch; }
.bcr-footer {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: clamp(5px, .8cqw, 8px);
  letter-spacing: 1.5px;
  font-weight: 900;
  opacity: .55;
}
.bcr-footer i { height: 1px; background: currentColor; flex: 1; opacity: .35; }
.bcr-credit {
  color: inherit;
  text-decoration: none;
  letter-spacing: 1.5px;
}
.bcr-credit:hover { text-decoration: underline; }

.bcr-race { width: 100%; height: 100%; position: relative; padding: 3% 0 1%; }
.bcr-period {
  position: absolute;
  z-index: 2;
  right: 0;
  top: 0;
  font: 700 clamp(12px, 2.8cqw, 30px) var(--bcr-font);
  color: var(--bcr-accent);
  animation: bcr-period-in .42s var(--bcr-start-delay) cubic-bezier(.22,1,.36,1) both;
}
.bcr-axis {
  position: absolute;
  left: 25%;
  right: 11%;
  top: 3%;
  display: flex;
  justify-content: space-between;
  font-size: clamp(5px, .85cqw, 9px);
  color: color-mix(in srgb, var(--bcr-text) 42%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--bcr-text) 14%, transparent);
  padding-bottom: .7%;
}
.bcr-list { position: absolute; inset: 18% 0 6%; }
.bcr-row {
  position: absolute;
  inset: 0 0 auto;
  height: calc(100% / var(--bcr-count));
  display: grid;
  grid-template-columns: 4% 17% 1fr 10%;
  align-items: center;
  gap: 2%;
  opacity: 1;
  transform: translate3d(0, var(--bcr-row-offset), 0);
  transition: transform calc(var(--bcr-duration) * .82) cubic-bezier(.22,1,.36,1), opacity .38s ease;
  will-change: transform;
  backface-visibility: hidden;
}
.bcr-rank { font-size: clamp(6px, 1cqw, 10px); opacity: .4; animation: bcr-rank-in .32s cubic-bezier(.22,1,.36,1) both; }
.bcr-row strong {
  font-size: clamp(7px, 1.4cqw, 14px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: clamp(3px, .7cqw, 7px);
  font-weight: 700;
}
.bcr-marker {
  flex: 0 0 auto;
  width: clamp(13px, 2.4cqw, 25px);
  height: clamp(13px, 2.4cqw, 25px);
  display: inline-grid;
  place-items: center;
  border-radius: 50%;
  background: color-mix(in srgb, var(--bcr-tone) 18%, var(--bcr-background));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--bcr-text) 10%, transparent);
  font-size: clamp(7px, 1.25cqw, 13px);
}
.bcr-variant-flags .bcr-marker { background: transparent; box-shadow: none; font-size: clamp(9px, 1.65cqw, 18px); }
.bcr-variant-medals .bcr-marker { background: #fff7df; }
.bcr-variant-market .bcr-marker { color: var(--bcr-background); background: var(--bcr-tone); font-weight: 900; }
.bcr-variant-minimal .bcr-row > i { height: 30%; }
.bcr-variant-minimal .bcr-row strong { font-family: Georgia, "Times New Roman", serif; font-weight: 500; }
.bcr-row > i {
  height: 62%;
  background: color-mix(in srgb, var(--bcr-text) 9%, transparent);
  overflow: hidden;
  border-radius: var(--bcr-radius);
  contain: paint;
  transform: scaleX(var(--bcr-bar-width));
  transform-origin: left;
}
.bcr-row > i b {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: var(--bcr-tone);
  opacity: var(--bcr-bar-opacity);
  border: var(--bcr-stroke-width) solid color-mix(in srgb, var(--bcr-text) 35%, transparent);
  transform: translateZ(0) scaleX(var(--bcr-bar-scale));
  transform-origin: left center;
  transition: transform calc(var(--bcr-duration) * .82) cubic-bezier(.22,1,.36,1);
  will-change: transform;
  backface-visibility: hidden;
}
.bcr-row.is-leader > i b { filter: saturate(1.2) drop-shadow(0 0 6px color-mix(in srgb, var(--bcr-tone) 38%, transparent)); }
.bcr-row.is-leader strong, .bcr-row.is-leader em { color: var(--bcr-accent); }
.bcr-race:not(.is-ready) .bcr-row { opacity: 0; }
.bcr-race:not(.is-ready) .bcr-row > i b { transform: translateZ(0) scaleX(0); }
.bcr-row em { font-style: normal; font-size: clamp(7px, 1.4cqw, 14px); font-weight: 900; text-align: right; }
.bcr-ranking .bcr-row > i { height: 3px; align-self: end; margin-bottom: 15%; }
.bcr-timeline { position: absolute; left: 25%; right: 11%; bottom: 0; display: flex; gap: 3px; }
.bcr-timeline i { flex: 1; height: 2px; background: color-mix(in srgb, var(--bcr-text) 14%, transparent); border-radius: 9px; transition: background .25s; }
.bcr-timeline i.active { background: var(--bcr-accent); }
@keyframes bcr-period-in { from { opacity: 0; transform: translate3d(0, 7px, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
@keyframes bcr-rank-in { from { opacity: 0; transform: translate3d(0, 4px, 0); } to { opacity: .4; transform: translate3d(0, 0, 0); } }
`;
  function ensureStyles() {
    if (typeof document === "undefined") return;
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  // src/engine.ts
  var CREDIT_URL = "https://livelychart.com";
  var CREDIT_LABEL = "LivelyChart";
  var DEFAULT_COLORS = ["var(--bcr-accent)", "var(--bcr-secondary)", "#ff7b63", "#4f8cff", "#f5b942", "#b66cf2"];
  var defaults = {
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
    credit: true
  };
  var instances = /* @__PURE__ */ new WeakMap();
  function fontStack(family) {
    if (family === "serif") return "Georgia, 'Times New Roman', serif";
    if (family === "mono") return "ui-monospace, SFMono-Regular, Menlo, monospace";
    return "Arial, Helvetica, sans-serif";
  }
  function formatNumber(value, options) {
    if (options.numberFormat === "percent") return `${value.toFixed(options.decimalPlaces)}%`;
    return new Intl.NumberFormat(void 0, {
      notation: options.numberFormat === "compact" ? "compact" : "standard",
      useGrouping: options.thousandsSeparator,
      minimumFractionDigits: options.decimalPlaces,
      maximumFractionDigits: options.decimalPlaces
    }).format(value);
  }
  function reducedMotion() {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }
  var Engine = class {
    constructor(host, options) {
      this.frame = 0;
      this.visible = true;
      this.playing = true;
      this.timer = 0;
      this.raf = 0;
      this.readyTimer = 0;
      this.rows = [];
      this.numberRaf = /* @__PURE__ */ new Map();
      this.host = host;
      this.options = { ...defaults, ...options, colors: options.colors ?? DEFAULT_COLORS };
      this.parsed = parseData(this.options.data);
      this.mount();
    }
    handle() {
      return {
        el: this.host,
        play: () => this.play(),
        pause: () => this.pause(),
        replay: () => this.replay(),
        setFrame: (frame) => this.setFrame(frame),
        update: (next) => this.update(next),
        destroy: () => this.destroy(),
        getFrame: () => this.frame
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
    setFrame(frame) {
      const count = this.frameCount();
      this.frame = (frame % count + count) % count;
      this.renderFrame(false);
    }
    update(next) {
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
    frameCount() {
      return Math.max(1, this.parsed.headers.length - 1);
    }
    mount() {
      ensureStyles();
      this.clearTimer();
      window.clearTimeout(this.readyTimer);
      this.observer?.disconnect();
      this.numberRaf.forEach((id) => window.cancelAnimationFrame(id));
      this.numberRaf.clear();
      this.host.replaceChildren();
      this.period = void 0;
      this.axis = void 0;
      this.timeline = void 0;
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
        heading.append(el("span", void 0, o.subtitle), el("h3", void 0, o.title));
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
        footer.append(el("i"), el("span", void 0, "PLAY THE NUMBERS"));
        this.canvas.append(footer);
      }
      this.host.append(this.canvas);
      this.buildRows();
      this.renderFrame(true);
      this.observe();
      this.armReady();
      if (o.loop) this.play();
    }
    buildRows() {
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
    renderFrame(resetNumbers) {
      const o = this.options;
      const values = this.rows.map((row) => {
        const source = this.parsed.rows[row.sourceIndex] ?? [];
        return {
          row,
          label: source[0] || "Item",
          value: asNumber(source[this.frame + 1])
        };
      });
      const ordered = o.sortOrder === "source" ? [...values] : [...values].sort((a, b) => o.sortOrder === "asc" ? a.value - b.value : b.value - a.value);
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
        this.period = void 0;
      }
      if (o.showXAxis) {
        if (!this.axis) {
          this.axis = el("div", "bcr-axis");
          this.race.append(this.axis);
        }
        this.axis.replaceChildren(
          el("span", void 0, "0"),
          el("span", void 0, formatNumber(max / 2, o)),
          el("span", void 0, formatNumber(max, o))
        );
      } else {
        this.axis?.remove();
        this.axis = void 0;
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
          })
        );
      } else {
        this.timeline?.remove();
        this.timeline = void 0;
      }
    }
    animateNumber(target, from, to, options) {
      const prev = this.numberRaf.get(target);
      if (prev) window.cancelAnimationFrame(prev);
      if (from === to || reducedMotion()) {
        target.textContent = formatNumber(to, options);
        return;
      }
      const startedAt = performance.now();
      const durationMs = Math.max(420, options.duration * 820);
      const tick = (now) => {
        const progress = Math.min(1, (now - startedAt) / durationMs);
        const eased = 1 - (1 - progress) ** 4;
        target.textContent = formatNumber(from + (to - from) * eased, options);
        if (progress < 1) this.numberRaf.set(target, window.requestAnimationFrame(tick));
        else this.numberRaf.delete(target);
      };
      this.numberRaf.set(target, window.requestAnimationFrame(tick));
    }
    observe() {
      if (typeof IntersectionObserver === "undefined") return;
      this.observer = new IntersectionObserver(([entry]) => {
        this.visible = entry.isIntersecting;
        if (this.visible && this.playing && this.options.loop) this.schedule();
        else this.clearTimer();
      }, { rootMargin: "120px", threshold: 0.01 });
      this.observer.observe(this.canvas);
    }
    armReady() {
      this.race.classList.remove("is-ready");
      this.readyTimer = window.setTimeout(() => {
        this.raf = window.requestAnimationFrame(() => this.race.classList.add("is-ready"));
      }, this.options.startDelay * 1e3);
    }
    schedule() {
      this.clearTimer();
      if (!this.playing || !this.options.loop || this.frameCount() <= 1 || !this.visible) return;
      const interval = Math.max(600, (this.options.duration + this.options.motionInterval + this.options.endDelay) * 1e3);
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
    clearTimer() {
      window.clearTimeout(this.timer);
      window.cancelAnimationFrame(this.raf);
      this.timer = 0;
      this.raf = 0;
    }
  };
  function mount(target, options) {
    const host = typeof target === "string" ? document.querySelector(target) : target;
    if (!host) throw new Error("BarChartRace: target not found");
    instances.get(host)?.destroy();
    const engine = new Engine(host, options);
    instances.set(host, engine);
    return engine.handle();
  }
  function destroy(target) {
    const host = typeof target === "string" ? document.querySelector(target) : target;
    if (!host) return;
    instances.get(host)?.destroy();
  }
  function createBarChartRace(target, options) {
    return mount(target, options);
  }
  return __toCommonJS(index_exports);
})();
//# sourceMappingURL=index.global.js.map