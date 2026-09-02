# Bar Chart Race

**Open-source bar chart race for the web. / 动态条形图 JS 开源库**

Zero-dependency JavaScript library that turns a CSV table into an animated ranking race: bars grow, reorder, and travel through time.

- Live editor: [LivelyChart](https://livelychart.com)
- Bar chart race maker: [livelychart.com/charts/bar-race](https://livelychart.com/charts/bar-race)
- Demo playground: [GitHub Pages](https://yananlee.github.io/bar-chart-race/)

This repository is the open-source race engine. [LivelyChart](https://livelychart.com) is the full visual editor — paste Excel or CSV, customize colors and timing, preview online, and export MP4, WebM, GIF, or PNG.

## 中文简介

`bar-chart-race` 是一套 **动态条形图 / Bar Chart Race** 开源库，把排名随时间变化的竞赛动画搬到网页里。

适合做品牌排名、市场份额、奖牌榜、国家对比。完整可视化编辑、数据导入和视频导出请用 [LivelyChart](https://livelychart.com)。

## Install

```bash
npm install bar-chart-race
```

No runtime dependencies.

## Usage

```js
import { mount } from "bar-chart-race";

mount("#chart", {
  data: `Brand,2022,2023,2024,2025
Nova,42,58,76,94
Orbit,61,68,73,88
Pixel,33,52,81,86
Sage,54,64,70,79
Vela,28,49,62,74`,
  title: "Momentum, made visible",
  subtitle: "LIVE DATA STORY · 2025",
});
```

CDN / browser:

```html
<div id="chart"></div>
<script src="https://cdn.jsdelivr.net/gh/YananLee/bar-chart-race@main/docs/bar-chart-race.global.js"></script>
<script>
  BarChartRace.mount("#chart", {
    data: "Brand,2022,2023,2024\nNova,42,58,76\nOrbit,61,68,73",
  });
</script>
```

Replay, pause, or replace the dataset:

```js
const chart = BarChartRace.mount("#chart", { data });
chart.replay();
chart.pause();
chart.update({ variant: "market", accent: "#8dff6a" });
chart.destroy();
```

JSON data also works:

```js
mount("#chart", {
  data: {
    periods: ["2022", "2023", "2024", "2025"],
    items: [
      { label: "Nova", values: [42, 58, 76, 94] },
      { label: "Orbit", values: [61, 68, 73, 88] },
    ],
  },
});
```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `string` or object | sample CSV | CSV, `{ headers, rows }`, or `{ periods, items }` |
| `title` | `string` | `"Momentum, made visible"` | Heading |
| `subtitle` | `string` | `"LIVE DATA STORY"` | Eyebrow |
| `accent` | `string` | `#635bff` | Primary color |
| `secondary` | `string` | `#28b8d5` | Second series color |
| `background` | `string` | `#ffffff` | Canvas background |
| `textColor` | `string` | `#353745` | Text color |
| `duration` | `number` | `1.4` | Motion duration per period, seconds |
| `loop` | `boolean` | `true` | Repeat through periods |
| `itemCount` | `number` | `6` | Visible rows |
| `sortOrder` | `"desc" \| "asc" \| "source"` | `"desc"` | Ranking order |
| `variant` | `"plain" \| "flags" \| "medals" \| "market" \| "minimal" \| "ranking"` | `"plain"` | Visual style |
| `showRanks` | `boolean` | `true` | Rank numbers |
| `highlightLeader` | `boolean` | `false` | Emphasize 1st place |
| `credit` | `boolean` | `true` | Keep the [LivelyChart](https://livelychart.com) credit link |

## Related / 相关产品

Build, preview, and export this bar chart race in the browser:

**[LivelyChart](https://livelychart.com)** — online animated chart maker / 在线动态条形图与动态图表编辑器.

Create a bar chart race from Excel or CSV: [livelychart.com/charts/bar-race](https://livelychart.com/charts/bar-race)

## License

MIT.
