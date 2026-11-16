"""Bar chart SVG for LivelyChart workflows."""
from html import escape
import math
import re


def render_bars(data, *, width=800, color="#4f46e5"):
    if not isinstance(data, (list, tuple)) or not 1 <= len(data) <= 20 or not isinstance(width, int) or width < 300 or not re.fullmatch(r"#[0-9a-fA-F]{6}", color):
        raise ValueError("invalid bars or options")
    for item in data:
        if not isinstance(item, (list, tuple)) or len(item) != 2 or not isinstance(item[0], str) or not item[0].strip() or not isinstance(item[1], (int, float)) or not math.isfinite(item[1]) or item[1] < 0:
            raise ValueError("bars must be (label, nonnegative value) pairs")
    height = len(data) * 48 + 32
    maximum = max([float(item[1]) for item in data] + [1.0])
    bars = []
    for i, (label, value) in enumerate(data):
        y = i * 48 + 16
        bar_width = round((width - 200) * value / maximum)
        bars.append(f'<text x="16" y="{y+25}" font-family="Arial,sans-serif" font-size="16">{escape(label)}</text><rect x="150" y="{y}" width="{bar_width}" height="32" rx="4" fill="{color}"/><text x="{158+bar_width}" y="{y+23}" font-family="Arial,sans-serif" font-size="14">{value}</text>')
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-label="Bar chart"><rect width="100%" height="100%" fill="#ffffff"/>{"".join(bars)}</svg>'
