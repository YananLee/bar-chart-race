const { mount } = BarChartRace;

const chartEl = document.querySelector("#chart");
const dataInput = document.querySelector("#data");
const titleInput = document.querySelector("#title");
const accentInput = document.querySelector("#accent");
const variantBox = document.querySelector("#variants");

const samples = {
  plain: `Brand,2022,2023,2024,2025
Nova,42,58,76,94
Orbit,61,68,73,88
Pixel,33,52,81,86
Sage,54,64,70,79
Vela,28,49,62,74
Lumen,47,53,59,71`,
  flags: `Country,2014,2015,2016,2017,2018
United States,146000,159000,174000,190000,205443
China,104000,112500,120700,129400,136082
Japan,42100,44700,46800,48200,49713
Germany,35200,36300,37400,38600,39476
United Kingdom,24100,25500,26700,27800,28553
France,22900,24100,25300,26600,27775
India,18300,20400,22700,24800,27187
Italy,19100,19600,20100,20500,20839`,
  medals: `Team,Round 1,Round 2,Round 3,Final
Falcon,58,76,91,108
Atlas,72,81,87,101
Comet,43,69,88,97
Ranger,66,73,82,92
Pulse,39,61,77,89
Vertex,51,58,70,83`,
  market: `Company,2022,2023,2024,2025
Northstar,38,56,84,112
Helix,61,70,86,104
Arc,29,53,79,99
Lumen,45,62,75,91
Quanta,33,48,69,88
Signal,21,42,63,81`,
  minimal: `Topic,Jan,Feb,Mar,Apr,May
Climate,42,51,64,76,89
Technology,68,70,74,81,86
Economy,57,63,69,73,80
Health,49,55,61,70,78
Culture,31,44,56,68,75`,
  ranking: `Product,Q1,Q2,Q3,Q4
Studio,48,66,78,96
Cloud,71,74,81,89
Flow,39,58,76,84
Core,65,69,72,80
Edge,30,47,63,75`,
};

const variants = [
  { id: "plain", name: "Bar race / 动态条形" },
  { id: "flags", name: "Flags / 旗帜" },
  { id: "medals", name: "Medals / 奖牌" },
  { id: "market", name: "Market / 市场" },
  { id: "minimal", name: "Editorial / 编辑风" },
  { id: "ranking", name: "Leaderboard / 排行榜" },
];

const variantOptions = {
  plain: {},
  flags: { title: "Global momentum", subtitle: "COUNTRY INDEX", highlightLeader: true, itemCount: 8 },
  medals: { title: "The final podium", subtitle: "CHAMPIONSHIP · LIVE", background: "#fffaf0", rounded: 12, highlightLeader: true },
  market: { title: "Market velocity", subtitle: "GROWTH INDEX", background: "#10131c", textColor: "#f5f7ff", accent: "#8dff6a", secondary: "#34d9ff", rounded: 5, shadow: true, highlightLeader: true },
  minimal: { title: "What people followed", subtitle: "EDITORIAL SIGNAL", accent: "#222222", secondary: "#999999", background: "#f7f5f0", textColor: "#222222", rounded: 0, showRanks: false },
  ranking: { title: "Leaderboard", subtitle: "WEEKLY SCORE · LIVE", rounded: 20 },
};

let variant = "plain";
let chart;

function play() {
  const extra = variantOptions[variant] || {};
  chart = mount(chartEl, {
    ...extra,
    data: dataInput.value,
    title: titleInput.value || extra.title,
    accent: accentInput.value || extra.accent,
    variant,
  });
}

function renderVariants() {
  variantBox.innerHTML = "";
  variants.forEach((item) => {
    const button = document.createElement("button");
    button.className = `preset${item.id === variant ? " active" : ""}`;
    button.type = "button";
    button.textContent = item.name;
    button.addEventListener("click", () => {
      variant = item.id;
      if (samples[variant]) dataInput.value = samples[variant];
      const extra = variantOptions[variant] || {};
      if (extra.title) titleInput.value = extra.title;
      if (extra.accent) accentInput.value = extra.accent;
      renderVariants();
      play();
    });
    variantBox.appendChild(button);
  });
}

document.querySelector("#replay").addEventListener("click", () => {
  if (chart) chart.replay();
  else play();
});
dataInput.addEventListener("change", play);
titleInput.addEventListener("change", play);
accentInput.addEventListener("change", play);

renderVariants();
play();
