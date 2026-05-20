# -*- coding: utf-8 -*-
import pathlib

root = pathlib.Path(__file__).resolve().parents[1]
vue_path = root / "app" / "src" / "views" / "app" / "Dashboard.vue"
body_path = root / "app" / "src" / "views" / "app" / "dashboard-body.html"

body = body_path.read_text(encoding="utf-8")
lines = vue_path.read_text(encoding="utf-8").splitlines(keepends=True)

start = end = None
for i, line in enumerate(lines):
    if "<!-- Nuevo Dashboard Design -->" in line or "<!-- Dashboard Moringa -->" in line:
        start = i
for i in range(start + 1, len(lines)):
    if lines[i].strip() == "</motion.div>" and "dashboard" in "".join(lines[max(0, start - 2) : start + 3]):
        pass
for i in range(start + 1, len(lines)):
    s = lines[i].strip()
    if s == "</motion.div>" and i > start + 20:
        # first closing div at column 6 after dashboard open - check indent
        if lines[i].startswith("      </"):
            end = i
            break

if start is None or end is None:
    raise SystemExit(f"markers not found start={start} end={end}")

new_lines = lines[:start] + [body if body.endswith("\n") else body + "\n"] + lines[end + 1 :]
vue_path.write_text("".join(new_lines), encoding="utf-8")
print(f"Spliced lines {start+1}-{end+1}")
