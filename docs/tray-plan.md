# System Tray Implementation Plan

## Overview
Add a system tray icon (right side of the taskbar) to provide quick access to app actions without needing a visible window.

## 1. Dependencies (Cargo.toml)

Enable the `tray-icon` feature for Tauri v2:
```toml
tauri = { version = "2", features = ["protocol-asset", "tray-icon"] }
```

## 2. Tray Icon Setup (lib.rs — `run()`)

- Build a `TrayIconBuilder` with a label (e.g. `"main-tray"`).
- Set an icon (from bundled icons or loaded at runtime).
- Attach click event handlers:
  - **Left-click** → toggle switch-bar visibility.
  - **Right-click** → open a native context menu (quit, open wallpapers folder, etc.).

## 3. Context Menu

Menu items to include:
- Show/Hide Switch Bar
- Open Wallpapers Folder
- Separator
- Quit

## 4. Rust-side Implementation

```rust
// Pseudo-code outline (lib.rs)

use tauri::{
    menu::{MenuBuilder, MenuItemBuilder},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager,
};

// In .setup():
TrayIconBuilder::with_id("main-tray")
    .icon(app.default_window_icon().unwrap().clone())
    .on_tray_icon_event(|tray, event| {
        match event {
            TrayIconEvent::Click { button: MouseButton::Left, button_state: MouseButtonState::Up, .. } => {
                // Toggle switch-bar
            }
            _ => {}
        }
    })
    .build(app)?;
```

## 5. Icon Resource

- Use existing bundled icon (`icons/logoww.ico` or `logoww.png`).
- Optionally add a dedicated 16×16 / 32×32 tray icon.

## 6. Notes

- The tray icon should remain alive even when switch-bar is hidden.
- No window opens by default; all interaction happens via the icon click or context menu.
- Tray lifecycle is tied to the app lifecycle (no cleanup needed on hide).