# Photos

Drop photos into `public/photos/` as `.jpg` or `.webp`. The build does the rest.

- `public/photos/portrait.jpg` (or `.webp`) is the portrait on the home page and on `/about`. Without it, both show a typographic monogram. Portrait crop is 4:5; keep the face in the upper middle.
- Every other `.jpg`/`.webp` in that folder appears on `/photos`, in the order of `photos.json`, then by file name.
- `scripts/generate-content.mjs` writes 640px and 1280px WebP variants to `public/photos/_v/` (generated, not committed) and `src/generated/photos.json`. Width and height are always set, so nothing shifts while loading.

## Captions: `public/photos/photos.json`

Schema: `public/photos/photos.schema.json`.

```json
{
  "$schema": "./photos.schema.json",
  "photos": {
    "stone-town-2024.jpg": {
      "alt": { "en": "Dhows at sunset off Stone Town", "de": "Dhaus bei Sonnenuntergang vor Stone Town" },
      "caption": { "en": "Stone Town, the evening before the festival.", "de": "Stone Town, am Abend vor dem Festival." },
      "date": "2024-02",
      "place": "Zanzibar"
    }
  }
}
```

`alt` describes what is in the picture (for screen readers and search). `caption` is the visible line under it. `hidden: true` keeps a file in the folder without showing it.
