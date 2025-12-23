
use std::path::PathBuf;
use std::fs;
use image::{
    DynamicImage, 
    imageops::{
        resize,
        FilterType
    }, 
    GenericImageView};
use rayon::prelude::*;
use super::storage::{
    thumb_dir,
    list_files_recursive, 
    wallpapers_dir
};

pub struct ThumbnailManager {}

impl ThumbnailManager {

    pub fn new() -> Self {
        Self {}
    }

    fn generate_thumbnail_filename(&self, original_path: &PathBuf) -> PathBuf {
        let filename = original_path.file_stem().unwrap_or_default().to_string_lossy();
        let extension = original_path.extension().unwrap_or_default().to_string_lossy();

        PathBuf::from(format!("thumb_{}.{}", filename, extension))
    }

    pub fn get_thumbnail_path(&self, original_path: &PathBuf) -> PathBuf {
        let filename = self.generate_thumbnail_filename(original_path);
        thumb_dir().join(filename)
    }

    pub fn resize_image(
        &self,
        input_path: &PathBuf,
        max_width: u32,
        max_height: u32,
        filter: FilterType,
    ) -> Result<DynamicImage, Box<dyn std::error::Error>> {
        let img = image::open(input_path)?;
        let (original_width, original_height) = img.dimensions();
        
        let ratio = original_width as f32 / original_height as f32;
        let (new_width, new_height) = if original_width > original_height {
            let height = (max_width as f32 / ratio).min(max_height as f32) as u32;
            (max_width.min(original_width), height)
        } else {
            let width = (max_height as f32 * ratio).min(max_width as f32) as u32;
            (width, max_height.min(original_height))
        };

        let resized = resize(&img, new_width, new_height, filter);
        Ok(DynamicImage::ImageRgba8(resized))
    }

    pub fn create_thumbnail(
        &self,
        original_path: &PathBuf,
        max_width: u32,
        max_height: u32,
        filter :FilterType,
    ) -> Result<PathBuf, Box<dyn std::error::Error>> {
        let thumb_path = self.get_thumbnail_path(original_path);
        
        if thumb_path.exists() {
            return Ok(thumb_path);
        }

        let thumbnail = self.resize_image(original_path, max_width, max_height, filter)?;
        
        thumbnail.save(&thumb_path)?;
        
        Ok(thumb_path)
    }

    pub fn create_preview_thumbnail(&self, original_path: &PathBuf) -> Result<PathBuf, Box<dyn std::error::Error>> {
        println!("Creating preview thumbnail for {:?}", original_path);
        self.create_thumbnail(
            original_path,
            320,  
            180,  
            FilterType::Nearest
        )
    }

    pub fn cleanup_orphaned_thumbnails(&self) -> () {
        let existing_thumbnails: Vec<PathBuf> = list_files_recursive(wallpapers_dir(), Some(1), Some(&["png","jpg","jpeg"]))
            .unwrap_or_default()
            .iter()
            .map(|path| self.generate_thumbnail_filename(path))
            .collect();

        for entry in fs::read_dir(&thumb_dir()).unwrap() {
            let entry = entry.unwrap();
            let filename = entry.file_name();
            let filename_str = filename.to_string_lossy();
            
            if !filename_str.starts_with("thumb_") {
                continue;
            }

            if !existing_thumbnails.contains(&PathBuf::from(filename_str.as_ref())) {
                println!("Removing orphaned thumbnail: {:?}", entry.path());
                let _ = fs::remove_file(entry.path());
            }
        }
    }

    pub fn generate_fast_thumbs(&self) {
        let paths = list_files_recursive(wallpapers_dir(), Some(1), Some(&["jpg", "png", "jpeg"])) 
            .expect("Failed to list wallpaper files");
        println!("Generating thumbnails for {} files", paths.len());
        paths.par_iter().for_each(|p| {
            let _ = self.create_preview_thumbnail(p);
        });
    } 

}
