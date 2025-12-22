mod ui;
mod services;

use ui::{run_app};
use wallpaper;


fn change_wallpaper() {
   println!("{:?}", wallpaper::get());
   wallpaper::set_from_path(r"C:\Users\louis\Desktop\Dev\projets\win-wallpaper\assets\wp.png").unwrap();
   wallpaper::set_mode(wallpaper::Mode::Stretch).unwrap();
   println!("{:?}", wallpaper::get());
}

fn main() {
   let _ = run_app();
   println!("Test")
}
