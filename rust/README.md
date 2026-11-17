# livelychart-svg

A small local SVG generator for [LivelyChart](https://livelychart.com/). It does not call the site or provide full video/export functionality.

```sh
cargo add livelychart-svg
```

Use `livelychart_svg::render_bars(&[("A", 10.0), ("B", 5.0)])` to return an SVG string. MIT licensed.
