use super::storage::get_shortcut;
use tauri::Manager;
use tauri_plugin_global_shortcut::{GlobalShortcutExt, Shortcut, ShortcutState};

pub fn setup_shortcut<R: tauri::Runtime>(builder: tauri::Builder<R>) -> tauri::Builder<R> {
    builder
        .plugin(
            tauri_plugin_global_shortcut::Builder::new()
                .with_handler(|app, shortcut, event| {
                    println!(
                        "Shortcut event received: {:?} for {}",
                        event.state(),
                        shortcut.to_string()
                    );
                    if event.state() == ShortcutState::Pressed {
                        let active_shortcut = get_shortcut();
                        let shortcut_str = shortcut.to_string().to_lowercase();

                        // Match either "alt+w" or "alt+keyw" (Tauri v2 format)
                        let matches = shortcut_str == active_shortcut
                            || shortcut_str == active_shortcut.replace("+", "+key");

                        if matches {
                            println!(
                                "Shortcut {} detected! Toggling switch-bar...",
                                active_shortcut
                            );

                            // Toggle switch-bar visibility
                            if let Some(window) = app.get_webview_window("switch-bar") {
                                let is_visible = window.is_visible().unwrap_or(false);
                                println!("Current visibility: {}", is_visible);
                                if is_visible {
                                    window.hide().unwrap();
                                    window.set_ignore_cursor_events(true).unwrap();
                                    println!("Hidden and ignoring cursor events.");
                                } else {
                                    window.show().unwrap();
                                    window.set_ignore_cursor_events(false).unwrap();
                                    window.set_focus().unwrap();
                                    let _ = window.eval("window.focus();");
                                    println!("Shown and accepting cursor events.");
                                }
                            } else {
                                println!("Error: 'switch-bar' window not found!");
                            }
                        }
                    }
                })
                .build(),
        )
}

pub fn init_shortcut<R: tauri::Runtime>(app: &tauri::App<R>) -> Result<(), Box<dyn std::error::Error>> {
    // Register Shortcut from config
    let shortcut_to_reg = get_shortcut();

    // Convert stored shortcut string into the Shortcut type required by the API
    let shortcut_wrapper = Shortcut::try_from(shortcut_to_reg.as_str())
        .expect("Invalid shortcut format stored in config");
    match app.global_shortcut().register(shortcut_wrapper) {
        Ok(_) => println!("Successfully registered {} shortcut", shortcut_to_reg),
        Err(e) => println!("Failed to register {} shortcut: {}", shortcut_to_reg, e),
    };

    Ok(())
}




