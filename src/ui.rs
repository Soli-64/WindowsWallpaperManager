use eframe::egui::{self, CentralPanel, ScrollArea, TextureHandle};
use std::sync::Mutex;
use once_cell::sync::Lazy;
use windows_sys::Win32::Foundation::HWND;
use windows_sys::Win32::UI::WindowsAndMessaging::{
    SetLayeredWindowAttributes,
    FindWindowW,
    GetWindowLongPtrW,
    SetWindowLongPtrW,
    GWL_EXSTYLE,
    WS_EX_LAYERED,
};
use egui::Color32;

const LWA_ALPHA: u32 = 0x00000002;

use crate::services::{
    hotkey::toggle_window_state,
};

#[derive(Clone)]
#[allow(dead_code)]
struct CarouselItem {
    tex: TextureHandle,
    size: egui::Vec2,
}

static MOUSE_PASSTHROUGH_STATE: Lazy<Mutex<bool>> = Lazy::new(|| Mutex::new(false));

pub fn get_mouse_passthrough_state() -> bool {
    MOUSE_PASSTHROUGH_STATE.lock().unwrap().clone()
}

pub fn set_mouse_passthrough_state(state: bool) {
    *MOUSE_PASSTHROUGH_STATE.lock().unwrap() = state;
}

static WINDOW_HWND: Lazy<Mutex<Option<isize>>> = Lazy::new(|| Mutex::new(None));

pub fn set_window_alpha(alpha: u8) {
    if let Some(hwnd) = *WINDOW_HWND.lock().unwrap() {
        unsafe {
            let ex = GetWindowLongPtrW(hwnd as HWND, GWL_EXSTYLE) as isize;
            if (ex as u32 & WS_EX_LAYERED) == 0 {
                SetWindowLongPtrW(hwnd as HWND, GWL_EXSTYLE, (ex | WS_EX_LAYERED as isize) as isize);
            }
            SetLayeredWindowAttributes(hwnd as HWND, 0, alpha, LWA_ALPHA);
        }
    }
}

pub fn store_window_hwnd(hwnd: isize) {
    *WINDOW_HWND.lock().unwrap() = Some(hwnd);
}

fn find_window_by_title(title: &str) -> Option<isize> {
    use std::ffi::OsStr;
    use std::os::windows::ffi::OsStrExt;

    let wide: Vec<u16> = OsStr::new(title).encode_wide().chain(Some(0)).collect();
    unsafe {
        let h = FindWindowW(std::ptr::null(), wide.as_ptr());
        if h.is_null() { None } else { Some(h as isize) }
    }
}

struct WallpaperApp {
    visible: bool,
    items: Vec<CarouselItem>,
    #[allow(dead_code)]
    selected: usize
}


impl WallpaperApp {

    fn new(_cc: &eframe::CreationContext) -> Self {
        
        let items = WallpaperApp::load_items(&_cc.egui_ctx.clone());

        Self {
            items,
            selected: 0,
            visible: false
        }
    }

    fn load_items(
        _ctx: &egui::Context
    ) -> Vec<CarouselItem> {
        let items = Vec::new();
        items
    }

    fn ui(&mut self, ui: &mut egui::Ui) {

        ScrollArea::horizontal()
            .show(ui, |ui| {
                
                ui.horizontal(|ui| {
    
                    for item in &self.items {
                            ui.add(
                                egui::Image::new(&item.tex)
                            );
                            ui.add_space(12.0);
                        }
                
                });

            });
        
    }
}

impl eframe::App for WallpaperApp {
    
    fn update(&mut self, _ctx: &egui::Context, _frame: &mut eframe::Frame) {
        
        static HWND_STORED: Lazy<Mutex<bool>> = Lazy::new(|| Mutex::new(false));
        {
            let mut stored = HWND_STORED.lock().unwrap();
            if !*stored {
                *stored = true;
            }
        }
        
        let state = get_mouse_passthrough_state();
        if self.visible == state {
            if state {
                _ctx.send_viewport_cmd(egui::ViewportCommand::MousePassthrough(true));
                set_window_alpha(0); 
                self.visible = false;
            } else {
                _ctx.send_viewport_cmd(egui::ViewportCommand::MousePassthrough(false));
                set_window_alpha(255); 
                self.visible = true;
            }
        }

        if _ctx.input(|i| i.clone().consume_key(egui::Modifiers::ALT, egui::Key::W)) {
            set_mouse_passthrough_state(self.visible)
        }

        if self.visible {
            CentralPanel::default()
                .frame(egui::Frame::default().fill(Color32::from_rgb(20, 20, 20)))
                .show(_ctx, |ui| {
                    self.ui(ui);
                });
        } else {
            CentralPanel::default()
                .show(_ctx, |_ui| {});
        }  

    }
}

pub fn run_app() -> eframe::Result<()> {

    let dsip_sz = rdev::display_size().unwrap();

    let width: f32 = 1200.;
    let height: f32 = 200.;

    let x = ( dsip_sz.0 as f32 - width as f32) / 2.;
    let y = ( dsip_sz.1 as f32 - height as f32) / 2.;
    
    let native_options = eframe::NativeOptions {
        viewport: egui::ViewportBuilder { 
            title: None, 
            app_id: None, 
            position: Some(egui::Pos2 { x, y }),
            inner_size: Some(egui::Vec2::new(width, height)), 
            min_inner_size: None, 
            max_inner_size: None, 
            fullscreen: Some(false), 
            maximized: Some(false), 
            resizable: Some(false), 
            transparent: Some(true), 
            decorations: Some(false), 
            icon: None, 
            active: Some(true), 
            visible: Some(false), 
            fullsize_content_view: Some(false), 
            title_shown: Some(false), 
            titlebar_buttons_shown: Some(false), 
            titlebar_shown: Some(false), 
            drag_and_drop: Some(false),
            taskbar: Some(false), 
            close_button: Some(false), 
            minimize_button: Some(false), 
            maximize_button: Some(false), 
            window_level: Some(egui::viewport::WindowLevel::AlwaysOnTop), 
            mouse_passthrough: Some(true), 
            window_type: None,
            clamp_size_to_monitor_size: Some(false),
            movable_by_window_background: Some(false),
            has_shadow: Some(false)
        },
        ..Default::default()
    };

    eframe::run_native(
        "Wallpaper Manager",
        native_options,
        Box::new(move |_cc| {
            let app = WallpaperApp::new(_cc);

            let ctx = _cc.egui_ctx.clone();

            std::thread::spawn(move || {
                std::thread::sleep(std::time::Duration::from_millis(500));
                if let Some(hwnd) = find_window_by_title("Wallpaper Manager") {
                    store_window_hwnd(hwnd);
                }
                toggle_window_state(ctx.clone());
            });
            
            Ok(Box::new(app))
        }),
    )
}
