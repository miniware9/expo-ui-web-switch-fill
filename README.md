# On web, a labeled `Switch` cannot fill its row

`@expo/ui` 58.0.20, Expo SDK 58, web (Chrome 151).

1. `npm install`, then `npx expo start --web`.
2. The screen stacks three `Switch` components from `@expo/ui`, labeled
   "Size", "Connection labels" and "Color by net score". Each is in a `Host`
   that spans the screen's width, shaded gray.

Expected: as on Android and iOS, each label takes the free width and every
switch sits at the trailing edge of its row, so the three line up.

Actual: each switch sits right after its label, so the three form a ragged
column. The `<label>` that `Switch` renders spans the row, but its label
`Text` does not grow, so the free width stays after the switch.
