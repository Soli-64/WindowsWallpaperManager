use notify::{RecommendedWatcher, RecursiveMode, Watcher};

fn main() {
    let mut watcher = notify::recommended_watcher(|res| {
        match res {
            Ok(event) => println!("event: {:?}", event),
            Err(e) => println!("watch error: {:?}", e),
        }
    }).unwrap();
}
