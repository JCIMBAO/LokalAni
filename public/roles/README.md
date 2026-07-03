# Role illustrations

Drop the three character illustrations here and they'll appear on the
role-picker cards automatically. Until a file exists, each card shows a clean
icon fallback — so the page looks fine without them.

## Filenames (use these exact names)

| File               | Card                 | Character                         |
|--------------------|----------------------|-----------------------------------|
| `carinderia.png`   | Karinderya           | woman cooking / holding vegetables |
| `vendor.png`       | Taga-Palengke        | market vendor with crates          |
| `driver.png`       | Tsuper ng TODA       | TODA tricycle driver               |

- **Transparent PNGs look best** (the character sits on the card's tint). `.png`, `.webp`, `.jpg` all work (tried in that order).
- Roughly **square / portrait** framing; the character is shown `object-contain` anchored to the bottom, so full upper-body art works well.
- Keep them small (~600px, under ~300 KB each).
- After adding files locally, refresh. To show them on the live Vercel site:
  `git add public/roles && git commit -m "role illustrations" && git push`.
