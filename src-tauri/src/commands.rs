use crate::storage::{
    ensure_storage_initialized, get_active_setup as storage_get_active_setup, get_monitor_config,
    list_files_recursive, load_config, save_config,
    set_active_setup as storage_set_active_setup,
    set_monitor_wallpaper as storage_set_monitor_wallpaper,
    set_monitor_widgets as storage_set_monitor_widgets, wallpapers_dir, widgets_config_path,
    widgets_dir, Setup,
};
use crate::thumbnail::ThumbnailManager;
use tauri::Emitter;

#[tauri::command]
pub fn set_wallpaper_config(path: String) {
    save_config(path);
}

//
// Get default wallpaper (from config or fallback)
//
#[tauri::command]
pub fn get_default_wallpaper() -> String {
    if let Some(path) = load_config() {
        if std::path::Path::new(&path).exists() {
            return path;
        }
    }

    let w_dir = wallpapers_dir();
    let files = list_files_recursive(w_dir, 1, Some(&["jpg", "jpeg", "png", "mp4", "webm"]));
    if let Some(first) = files.first() {
        return first.to_string_lossy().to_string();
    }

    "".to_string()
}

#[derive(serde::Serialize)]
pub struct WallpaperItem {
    pub name: String,
    pub path: String,
    pub thumb_path: String,
    pub is_video: bool,
}

#[derive(serde::Serialize, serde::Deserialize, Clone)]
pub struct Widget {
    pub id: String,
    pub name: String,
    pub html_file: String,
    #[serde(default)]
    pub html_content: String,
}

//
// Get list of widgets (from widgets.json, loads and parse html files content)
//
#[tauri::command]
pub fn get_widgets() -> Result<Vec<Widget>, String> {
    let config_path = widgets_config_path();
    if !config_path.exists() {
        return Ok(vec![]);
    }

    let content = std::fs::read_to_string(&config_path).map_err(|e| e.to_string())?;
    let mut widgets: Vec<Widget> = serde_json::from_str(&content).map_err(|e| e.to_string())?;

    let w_dir = widgets_dir();
    for widget in &mut widgets {
        let html_path = w_dir.join(&widget.html_file);
        if html_path.exists() {
            widget.html_content = std::fs::read_to_string(html_path).unwrap_or_default();
        }
    }

    Ok(widgets)
}

//
// Get list of wallpapers (recursive w/ limited depth)
// Checks media format, creates thumbnails if needed, and returns list of wallpapers
//
#[tauri::command]
pub fn get_wallpapers() -> Vec<WallpaperItem> {
    ensure_storage_initialized();

    let mut items = Vec::new();
    let extensions = ["png", "jpg", "jpeg", "webp", "mp4", "webm", "mov"];
    let paths = list_files_recursive(wallpapers_dir(), 1, Some(&extensions));

    let thumb_manager = ThumbnailManager::new();

    for path in paths {
        let is_video = match path.extension() {
            Some(ext) => {
                ["mp4", "webm", "mov"].contains(&ext.to_string_lossy().to_lowercase().as_str())
            }
            None => false,
        };

        let name = path
            .file_name()
            .unwrap_or_default()
            .to_string_lossy()
            .into_owned();
        let thumb_path = match thumb_manager.create_thumbnail(&path, is_video) {
            Ok(p) => p.to_string_lossy().into_owned(),
            Err(e) => {
                eprintln!("Failed to create thumbnail for {:?}: {}", path, e);
                // Fallback to original path if thumbnail fails (might not display well but won't crash)
                path.to_string_lossy().into_owned()
            }
        };

        items.push(WallpaperItem {
            name,
            path: path.to_string_lossy().into_owned(),
            thumb_path,
            is_video,
        });
    }

    items
}

//
// Per-monitor commands for setups feature
//

#[derive(serde::Serialize)]
pub struct MonitorInfo {
    pub index: u32,
    pub name: String,
    pub width: u32,
    pub height: u32,
    pub x: i32,
    pub y: i32,
}

#[tauri::command]
pub fn get_monitors(app: tauri::AppHandle) -> Vec<MonitorInfo> {
    let monitors = app.available_monitors().unwrap_or_default();

    if monitors.is_empty() {
        return vec![MonitorInfo {
            index: 1,
            name: "Monitor 1".to_string(),
            width: 1920,
            height: 1080,
            x: 0,
            y: 0,
        }];
    }

    monitors
        .iter()
        .enumerate()
        .map(|(i, m)| {
            let pos = m.position();
            let size = m.size();
            MonitorInfo {
                index: (i + 1) as u32,
                name: m.name().unwrap_or(&format!("Monitor {}", i + 1)).to_string(),
                width: size.width,
                height: size.height,
                x: pos.x,
                y: pos.y,
            }
        })
        .collect()
}

#[tauri::command]
pub fn get_monitor_wallpaper(monitor_index: u32) -> String {
    let config = get_monitor_config(monitor_index);
    let path = config.wallpaper_path;

    if !path.is_empty() && std::path::Path::new(&path).exists() {
        return path;
    }

    if let Some(default) = load_config() {
        return default;
    }

    let w_dir = wallpapers_dir();
    let files = list_files_recursive(w_dir, 1, Some(&["jpg", "jpeg", "png", "mp4", "webm"]));
    files
        .first()
        .map(|p| p.to_string_lossy().to_string())
        .unwrap_or_default()
}

#[tauri::command]
pub fn set_monitor_wallpaper(monitor_index: u32, path: String) {
    storage_set_monitor_wallpaper(monitor_index, path);
}

#[tauri::command]
pub fn get_monitor_widgets(monitor_index: u32) -> Vec<String> {
    let config = get_monitor_config(monitor_index);
    config.active_widgets
}

#[tauri::command]
pub fn set_monitor_widgets(monitor_index: u32, widgets: Vec<String>) {
    storage_set_monitor_widgets(monitor_index, widgets);
}

#[tauri::command]
pub fn get_active_setup() -> Option<Setup> {
    storage_get_active_setup()
}

#[tauri::command]
pub fn set_active_setup(name: String) {
    storage_set_active_setup(name);
}

pub fn refresh_config<R: tauri::Runtime>(app: &tauri::AppHandle<R>) {
    let current = get_default_wallpaper();
    if !current.is_empty() {
        let _ = app.emit("update-wallpaper", current);
    }
    let _ = app.emit("update-widgets", ());
}

#[tauri::command]
pub fn refresh_app(app: tauri::AppHandle) {
    refresh_config(&app);
}
