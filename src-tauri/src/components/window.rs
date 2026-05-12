use tauri::{Position, Size, WebviewUrl, WebviewWindowBuilder};
use tauri_plugin_wallpaper::{AttachRequest, WallpaperExt};

pub fn setup_monitors<R: tauri::Runtime>(app: &mut tauri::App<R>) -> Result<(), Box<dyn std::error::Error>> {
    //
    // Monitors handler
    // Create multiple windows to match every screen, adapting to sizes and positions
    //
    let monitors = app.available_monitors()?;

    let min_x = monitors.iter().map(|m| m.position().x).min().unwrap_or(0);
    let min_y = monitors.iter().map(|m| m.position().y).min().unwrap_or(0);

    for (i, monitor) in monitors.iter().enumerate() {
        println!(
            "Monitor: {}",
            monitor.name().expect("Monitor name not found").as_str()
        );

        let label = format!("wallpaper-{}", i);
        let pos = monitor.position();
        let size = monitor.size();

        println!(
            "Creating window {} for monitor: {}x{} @ ({},{})",
            label,
            monitor.size().width,
            monitor.size().height,
            monitor.position().x,
            monitor.position().y
        );

        //
        // Building the webview adapted to the monitor
        //
        let window = WebviewWindowBuilder::new(app, &label, WebviewUrl::App(format!("index.html?label={}", label).into()))
            .title(&format!("Wallpaper Bar {}", i))
            .decorations(false)
            .transparent(true)
            .shadow(false)
            .resizable(false)
            .visible(false)
            .fullscreen(false)
            // Changed the sizing and positioning in build to avoid some multi-screen errors
            // and scale it down
            .build()?;

        window.set_size(Size::Physical(size.clone()))?;
        window.set_position(Position::Physical(tauri::PhysicalPosition {
            x: pos.x - min_x,
            y: pos.y - min_y,
        }))?;

        window.show()?;

        // Attach as wallpaper
        app.handle()
            .wallpaper()
            .attach(AttachRequest::new(&label))?;
    }

    Ok(())
}
