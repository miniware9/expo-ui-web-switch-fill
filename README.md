# Expo UI Web Switch Fill

A minimal reproduction of a layout issue in `@expo/ui` where labeled `Switch` components do not align at the trailing edge of their rows on web.

## Issue

On web, a labeled `Switch` appears immediately after its label instead of at the trailing edge of the row. As a result, multiple switches with different label lengths do not line up.

On Android and iOS, the label occupies the available space and the switch sits at the trailing edge.

## Environment

- Expo SDK: 58
- `@expo/ui`: 58.0.20
- Browser: Chrome 151
- Operating system: Linux
- Viewport width: 420 px

## Steps to Reproduce

1. Clone this repository.
2. Install the dependencies:

   ```sh
   npm install
   ```

3. Start the Expo web server:

   ```sh
   npx expo start --web --clear
   ```

4. Open the application in the browser.
5. Compare the horizontal positions of the three labeled switches.

## Actual Behavior

Before the fix, the switches start at approximately these horizontal positions:

- Switch 1: x = 60 px
- Switch 2: x = 145 px
- Switch 3: x = 146 px

The switches appear immediately after their labels instead of aligning at the trailing edge of their rows.

## Expected Behavior

All three switches should align at the trailing edge of their rows, matching the layout on Android and iOS.

After applying the proposed fix, all three switches start at approximately x = 360 px, the trailing edge of the 372 px-wide rows.

## Proposed Fix

In `packages/expo-ui/src/universal/Switch/index.tsx`, add `flexGrow: 1` to the `text` style:

```tsx
text: {
  color: colors.foreground,
  flexGrow: 1,
  userSelect: 'none',
},
```

The label text then occupies the available horizontal space, moving the switch to the trailing edge.

This change affects the web implementation only. The Android and iOS implementations use separate platform-specific files.

## Additional Checks

After applying the fix, verify the following:

- Clicking the label still toggles the switch.
- Long labels wrap onto two lines while the switch remains at the trailing edge.
- A `Host` using `alignSelf: 'flex-start'` remains content-sized, with the switch immediately after the label.
- A `Host` with `dir="rtl"` places the switch at the leading edge.

## Screenshots

Add screenshots of the behavior before and after applying the fix.

### Before

The switches do not align at the trailing edge.

### After

The switches align at the trailing edge of their rows.

## Related Pull Request

Proposed change: Add `flexGrow: 1` to the universal web `Switch` label style in Expo's `expo/expo` repository.

The change is intended to match the existing Android and iOS layout behavior without adding runtime work.

## Testing Status

Manual verification was performed in Chrome 151 on Linux.

The automated package checks (`et check-packages`) and unit tests were not run locally because they require the full Expo pnpm monorepo installation. These checks are expected to run in CI.
