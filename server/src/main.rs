use warp::{http::StatusCode, Filter};

#[tokio::main]
async fn main() {
    let get_route = warp::get()
        .and(warp::path("hello"))
        .map(|| warp::reply::with_status("Hello, Warp!", StatusCode::OK));

    warp::serve(get_route).run(([127, 0, 0, 1], 3030)).await;
}
