# EU emblem — provenance and terms

**Downloaded:** 1 September 2026 · **Task:** AIT-49

These are the official "Co-funded by the European Union" horizontal lockups, in
the **NEG** variant (white wording, flag keeps its white keyline), because the
site footer sits on a dark surface (`bg-gray-900`).

## Where they came from

Canonical path (European Commission):

1. *Communicating and raising EU visibility* —
   <https://commission.europa.eu/funding-tenders/managing-your-project/communicating-and-raising-eu-visibility_en>
2. *Logo download centre* —
   <https://ec.europa.eu/regional_policy/information-sources/logo-download-center_en>
3. Per-language ZIPs, section "Co-funded by the European Union (horizontal and vertical)":

   | Lang | ZIP | Bytes |
   |---|---|---|
   | EN | `…/logo-download-center/co-funded_en.zip` | 12 684 953 |
   | HR | `…/logo-download-center/co-funded_hr.zip` | 9 534 390 |
   | RO | `…/logo-download-center/co-funded_ro.zip` | 14 312 525 |
   | EL | `…/logo-download-center/co-funded_el.zip` | 11 992 604 |

   Base: `https://ec.europa.eu/regional_policy/sources/information-sources/`

All four served HTTP 200 from `ec.europa.eu`, no redirect off `*.europa.eu`.
EN and HR were downloaded earlier in the AI4T final-phase work and are recorded
in that folder's `IZVORI.md`; RO and EL were fetched through the same channel for
this task.

From each ZIP: the `horizontal/RGB/PNG/*_NEG.png` branch — horizontal lockup,
RGB colour space (screen), negative variant (dark background).

## What was done to them

Exactly two things, both of which the visibility rules allow:

1. **Proportional downscale** to 144 px tall (LANCZOS), i.e. 3× the 48 px the
   footer renders them at.
2. **PNG re-compression** (`optimize=True`, level 9).

No recolouring, no cropping, no re-typesetting, no aspect-ratio change. The
sources stay 919 px tall in the project archive.

| File | Source px | Web px | Size |
|---|---|---|---|
| `en.png` | 4119 × 919 | 645 × 144 | 22.7 KB |
| `hr.png` | 3501 × 919 | 549 × 144 | 20.0 KB |
| `ro.png` | 4104 × 919 | 643 × 144 | 23.8 KB |
| `el.png` | 4894 × 919 | 767 × 144 | 30.7 KB |

One file loads per page view, chosen by the route language in `Footer.jsx`.
`hr` is shipped but not yet reachable — Croatian is still hidden in the
language switcher.

### Source checksums (the NEG PNGs as they came out of the ZIPs)

```
aaffa0627540898b020cff68caa0f342c355f49cea238664766c936dea0451fd  EN_Co-fundedbytheEU_RGB_NEG.png
bee18a1eecf5006f091f5766b5d65604cb3831cd7531a90692fb06a7466aee64  HR_Co-fundedbytheEU_RGB_NEG.png
63581e12022693bd4190e543e95fa62f748316d571090d00dc5abd4e2b24c10a  RO_Co-fundedbytheEU_RGB_NEG.png
90307429a4780e845c35eed99aad9cd37a796196fd87353e190485142c340801  EL_Co-fundedbytheEU_RGB_NEG.png
```

## Verification before use

Each of the four was checked two ways:

- **Programmatically** — 12 separate gold components per file, all within 3 % of
  the same area (1980–2034 px). That is the 12-star circle, complete.
- **Visually** — composited on the footer colour and read:
  - EN "Co-funded by the European Union"
  - HR "Sufinancira Europska unija"
  - RO "Cofinanțat de Uniunea Europeană"
  - EL "Με τη συγχρηματοδότηση της Ευρωπαϊκής Ένωσης"

## Why not SVG

The ZIPs ship EPS, not SVG. Converting EPS to SVG risks a tracer subtly altering
official artwork, which the rules forbid. A proportional raster downscale does
not, and at 144 px the files are 20–31 KB, so there is nothing to gain.

## Terms

The emblem may be used without prior permission to acknowledge EU support,
provided it is not altered (colours, proportions, typeface), stays clearly
visible, and does not imply the project owner is an EU institution.
Reference: *How to communicate your project — Erasmus+, European Solidarity
Corps, Creative Europe*.
