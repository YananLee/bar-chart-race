const STYLE_ID = "bar-chart-race-styles";

const CSS = `
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
.bcr-marker[hidden] { display: none !important; }
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

export function ensureStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
}
