Files added/edited by the UI hotfix:

- assets/css/ui-hotfix.css
  Purpose: small override stylesheet loaded after main.css to fix layout issues on desktop. Contains:
  - image containment (.img-frame utilities)
  - header alignment helpers
  - spacing tokens and section rhythm
  - Instagram button styles (icon-only on >=1024px)
  - viewer containment tweaks to avoid internal scrollbars
  - minor accessibility focus styles for arrows and viewer zones

- index.html
  Edited to import the new stylesheet: <link rel="stylesheet" href="assets/css/ui-hotfix.css">

Notes:
- This change is CSS-only. No markup, script, or image files were renamed or removed.
- To test: open the site at 1440x900 (local server). Project images should be fully visible with no internal scrollbars; header items should align and brand centered; Instagram link icon-only on desktop.
