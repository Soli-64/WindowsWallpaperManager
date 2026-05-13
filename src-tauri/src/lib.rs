mod components;
mod services;

use components::{tray, window};
use services::{
    commands, shortcut,
    storage::{ensure_storage_initialized, widgets_dir},
}; 

use notify::{RecursiveMode, Watcher};
use std::sync::{Arc, Mutex};
use std::time::Instant;
use tauri::{Emitter, Manager};

//
// Run the application
// - Init Tauri and modules
// - Setup event handlers
// - Setup watcher for widgets directory
//
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    //
    // Initialize Tauri Instance
    //
    let builder = tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_wallpaper::init());

    // Setup modular features
    let builder = shortcut::setup_shortcut(builder);

    builder
        .setup(|app| {
            
            // Initialize storage
            ensure_storage_initialized();

            // Initialize modular features
            shortcut::init_shortcut(app)?;
            tray::init_tray(app)?;

            let app_handle = app.handle().clone();

            //
            // Widgets Watcher with debounce
            //
            let last_update = Arc::new(Mutex::new(Instant::now()));
            let last_update_clone = last_update.clone();
            let app_handle_clone = app_handle.clone();

            let mut watcher =
                notify::recommended_watcher(move |res: notify::Result<notify::Event>| match res {
                    Ok(event) => {
                        if event.kind.is_modify()
                            || event.kind.is_create()
                            || event.kind.is_remove()
                        {
                            let mut last = last_update_clone.lock().unwrap();
                            let now = Instant::now();
                            if now.duration_since(*last).as_millis() >= 300 {
                                *last = now;
                                drop(last); // Release lock before emitting
                                let _ = app_handle_clone.emit("update-widgets", ());
                            }
                        }
                    }
                    Err(e) => println!("watch error: {:?}", e),
                })
                .expect("Failed to create watcher");

            watcher
                .watch(
                    std::path::Path::new(&widgets_dir()),
                    RecursiveMode::Recursive,
                )
                .expect("Failed to watch widgets directory");

            app.manage(std::sync::Mutex::new(watcher));

            // Setup monitors and windows
            window::setup_monitors(app)?;

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::get_wallpapers,
            commands::get_default_wallpaper,
            commands::get_widgets,
            commands::refresh_app,
            commands::get_monitors,
            commands::get_monitor_wallpaper,
            commands::set_monitor_wallpaper,
            commands::get_monitor_widgets,
            commands::set_monitor_widgets,
            commands::get_active_setup,
            commands::set_active_setup,
            commands::get_custom_mode,
            commands::set_custom_mode,
            commands::get_setups
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
