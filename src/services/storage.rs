use walkdir::{DirEntry, WalkDir};
use std::path::PathBuf;

pub fn list_files_recursive(
    root: impl AsRef<std::path::Path>,
    max_depth: Option<usize>,
    extensions: Option<&[&str]>,
) -> Result<Vec<PathBuf>, walkdir::Error> {
    let mut walker = WalkDir::new(root).follow_links(false);
    if let Some(d) = max_depth {
        walker = walker.max_depth(d);
    }
    
    let mut files = Vec::new();
    for entry in walker {
        let entry: DirEntry = entry?; 
        let path = entry.path();

        
        if !path.is_file() {
            continue;
        }

        
        if let Some(exts) = extensions {
            if let Some(ext) = path.extension().and_then(|e| e.to_str()) {
                if !exts.iter().any(|&e| e.eq_ignore_ascii_case(ext)) {
                    continue;
                }
            } else {
                continue; 
            }
        }

        files.push(path.to_path_buf());
    }

    Ok(files)
}