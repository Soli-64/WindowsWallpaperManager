
use wallpaper::set_from_path;
use super::storage::wallpapers_dir;

pub fn set_from_thumbnail_path(thumb_path: &str) -> Result<(), Box<dyn std::error::Error>> {
    let path = wallpapers_dir().join(thumb_path.replace("thumb_", ""));
    set_from_path(&path.to_str().expect("Error loading wallpaper."))?;
    Ok(())
}
