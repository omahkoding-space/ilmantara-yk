# Hero-only reference fonts

The live reference loads newer Google Fonts faces than the static Framer export. These unmodified Latin variable fonts are self-hosted for `HeroAnimated.astro` under CSS aliases `HeroGeist` and `HeroMono`. Shared shell/global font definitions are unchanged; no package dependency was added.

Verified against reference network responses on 2026-10-12:

- Geist v5: https://fonts.gstatic.com/s/geist/v5/gyByhwUxId8gMEwcGFU.woff2
  - SHA256: `19f9c92546aa300c312235e3125af1b81394d8db9a4bc4a425cd5b641d2d54e1`
- Geist Mono v6: https://fonts.gstatic.com/s/geistmono/v6/or3nQ6H-1_WfwkMZI_qYFrcdmg.woff2
  - SHA256: `684ad5b531f81d43c1e8c7038262d5db7cdc1f68006e04d6c7769efa8d33c8cc`

Both use the SIL Open Font License. Original license copies are included as `Geist-OFL.txt` and `GeistMono-OFL.txt`, from the Google Fonts `ofl/geist` and `ofl/geistmono` directories. CSS aliases do not modify the font binaries. Latin coverage matches this hero's current copy; future localization may need additional subsets.
