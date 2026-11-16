# livelychart-svg

A small local SVG generator for [LivelyChart](https://livelychart.com/). It does not call the site or provide full video/export functionality.

Install: `pip install livelychart-svg`.

```python
from livelychart_svg import render_bars
svg = render_bars([("A", 10), ("B", 5)])
```

MIT licensed.
