const FLAGS: Record<string, string> = {
  "United States": "🇺🇸", "美国": "🇺🇸", "米国": "🇺🇸", "미국": "🇺🇸", "Estados Unidos": "🇺🇸",
  China: "🇨🇳", "中国": "🇨🇳", "중국": "🇨🇳", "Chine": "🇨🇳", "Cina": "🇨🇳",
  Japan: "🇯🇵", "日本": "🇯🇵", "일본": "🇯🇵", "Japón": "🇯🇵", "Japão": "🇯🇵", "Japon": "🇯🇵",
  Germany: "🇩🇪", "德国": "🇩🇪", "ドイツ": "🇩🇪", "독일": "🇩🇪", "Alemania": "🇩🇪", "Deutschland": "🇩🇪",
  "United Kingdom": "🇬🇧", "英国": "🇬🇧", "영국": "🇬🇧", "Reino Unido": "🇬🇧", "Royaume-Uni": "🇬🇧",
  France: "🇫🇷", "法国": "🇫🇷", "フランス": "🇫🇷", "프랑스": "🇫🇷", "Francia": "🇫🇷", "França": "🇫🇷",
  India: "🇮🇳", "印度": "🇮🇳", "インド": "🇮🇳", "인도": "🇮🇳", "Índia": "🇮🇳",
  Italy: "🇮🇹", "意大利": "🇮🇹", "イタリア": "🇮🇹", "이탈리아": "🇮🇹", "Italia": "🇮🇹", "Itália": "🇮🇹",
  Brazil: "🇧🇷", "巴西": "🇧🇷", Canada: "🇨🇦", "加拿大": "🇨🇦", Australia: "🇦🇺", "澳大利亚": "🇦🇺",
  Korea: "🇰🇷", "韩国": "🇰🇷", "South Korea": "🇰🇷", Spain: "🇪🇸", "西班牙": "🇪🇸",
};

export function raceMarker(label: string, rank: number, variant: string) {
  if (variant === "medals") return ["🥇", "🥈", "🥉"][rank] ?? String(rank + 1);
  if (variant === "flags") return FLAGS[label] ?? label.slice(0, 2).toUpperCase();
  return label.slice(0, 1).toUpperCase();
}
