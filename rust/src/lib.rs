//! Lightweight SVG generator associated with LivelyChart.

fn escape(input: &str) -> String {
    input
        .chars()
        .map(|c| match c {
            '&' => "&amp;".to_string(),
            '<' => "&lt;".to_string(),
            '>' => "&gt;".to_string(),
            '"' => "&quot;".to_string(),
            '\'' => "&apos;".to_string(),
            _ => c.to_string(),
        })
        .collect()
}

/// Render up to 20 labeled nonnegative bars as SVG.
pub fn render_bars(data: &[(&str, f64)]) -> Result<String, &'static str> {
    if data.is_empty()
        || data.len() > 20
        || data
            .iter()
            .any(|(name, value)| name.trim().is_empty() || !value.is_finite() || *value < 0.0)
    {
        return Err("provide 1 to 20 valid bars");
    }
    let height = data.len() * 48 + 32;
    let maximum = data.iter().map(|(_, value)| *value).fold(1.0_f64, f64::max);
    let mut bars = String::new();
    for (index, (name, value)) in data.iter().enumerate() {
        let y = index * 48 + 16;
        let width = (600.0 * value / maximum).round() as usize;
        bars.push_str(&format!(r##"<text x="16" y="{}" font-family="Arial,sans-serif" font-size="16">{}</text><rect x="150" y="{y}" width="{width}" height="32" rx="4" fill="#4f46e5"/><text x="{}" y="{}" font-family="Arial,sans-serif" font-size="14">{value}</text>"##, y+25, escape(name), 158+width, y+23));
    }
    Ok(format!(
        r##"<svg xmlns="http://www.w3.org/2000/svg" width="800" height="{height}" viewBox="0 0 800 {height}" role="img" aria-label="Bar chart"><rect width="100%" height="100%" fill="#ffffff"/>{bars}</svg>"##
    ))
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn renders_escaped_svg() {
        let svg = render_bars(&[("A", 10.0), ("B", 5.0)]).unwrap();
        assert!(svg.starts_with("<svg "));
        assert!(svg.ends_with("</svg>"));
        assert!(!svg.contains("<script>"));
    }
}
