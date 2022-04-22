import "./blog.css"

function Blog() {
  return (
    <>
      <center>

        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

          <a class="navbar-brand" href="main.html">ATLAS</a>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="blogs.html">Blogs <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="search.html">Search</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="planner.html">Trip Planner</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="SignInPage.html">
                  <img class="sign" src="https://cdn3.iconfinder.com/data/icons/login-6/512/LOGIN-10-512.png" />
                </a>
              </li>
            </ul>
          </div>

        </nav>

      </center>


      <center>
        <div id="postsTitle" class="container">
          <h1>- Posts -</h1>
        </div>
      </center>

      <div id="bPostsHolder" class="container-fluid">
        <div id="bPosts" class="row">
          <div class="col">
            <img src="https://www.worldatlas.com/upload/00/7a/a1/shutterstock-1544405363.jpg" alt="" />
            <a href="planner.html" style="text-decoration: none;"><p>Click Here For More Info</p></a>
          </div>
          <div class="col">
            <img src="https://assets.weforum.org/global_future_council/image/xALg-7b0WN5aLOY6aejbKW3NepG-PEipzKnEuyS8ZlI.jpeg" alt="" />
            <a href="planner.html" style="text-decoration: none;"><p>Click Here For More Info</p></a>
          </div>
          <div class="col">
            <img src="https://media.cntraveler.com/photos/5a8f3b070e2cf839e9dbfa1d/2:1/w_2560%2Cc_limit/NYC_GettyImages-640006562.jpg" alt="" />
            <a href="planner.html" style="text-decoration: none;"><p>Click Here For More Info</p></a>
          </div>
          <div class="col">
            <img src="https://www.worldatlas.com/upload/00/7a/a1/shutterstock-1544405363.jpg" alt="" />
            <a href="planner.html" style="text-decoration: none;"><p>Click Here For More Info</p></a>
          </div>
        </div>
        <div id="bPosts" class="row">
          <div class="col">
            <img src="https://assets.weforum.org/global_future_council/image/xALg-7b0WN5aLOY6aejbKW3NepG-PEipzKnEuyS8ZlI.jpeg" alt="" />
            <a href="planner.html" style="text-decoration: none;"><p>Click Here For More Info</p></a>
          </div>
          <div class="col">
            <img src="https://media.cntraveler.com/photos/5a8f3b070e2cf839e9dbfa1d/2:1/w_2560%2Cc_limit/NYC_GettyImages-640006562.jpg" alt="" />
            <a href="planner.html" style="text-decoration: none;"><p>Click Here For More Info</p></a>
          </div>
          <div class="col">
            <img src="https://www.worldatlas.com/upload/00/7a/a1/shutterstock-1544405363.jpg" alt="" />
            <a href="planner.html" style="text-decoration: none;"><p>Click Here For More Info</p></a>
          </div>
          <div class="col">
            <img src="https://assets.weforum.org/global_future_council/image/xALg-7b0WN5aLOY6aejbKW3NepG-PEipzKnEuyS8ZlI.jpeg" alt="" />
            <a href="planner.html" style="text-decoration: none;"><p>Click Here For More Info</p></a>
          </div>
        </div>
      </div>

    </>
  );
}

export default Blog;