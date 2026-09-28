// Recharts props shared by every analytics chart. Colors use the CSS variables
// from your theme (--chart-*, --border, --popover...) so charts follow the
// light/dark tokens instead of hardcoded hex values.
export const AXIS_TICK = { fill: "var(--muted-foreground)", fontSize: 12 };

export const TOOLTIP_STYLE = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  color: "var(--popover-foreground)",
  fontSize: 12,
};

export const TOOLTIP_LABEL_STYLE = { color: "var(--muted-foreground)", marginBottom: 4 };
