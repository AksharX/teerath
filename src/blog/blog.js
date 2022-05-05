import { useEffect, useState } from "react";
import "./blog.css"

function Blog() {

  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    fetch(`http://localhost:3000/blogs`).then(async r => {
      setBlogs(await r.json())
    })
  }, [])

  return (
    <>
      <center>
        <div id="postsTitle" class="container">
          <h1>- Posts -</h1>
        </div>
      </center>

      <div id="bPostsHolder" class="container-fluid">
        <div id="bPosts" class="row">
          {blogs.map(blog => {
            return (
              <div key={blog._id} class="col">
                <img src={blog.imageUrl} alt="" />
                <a href={`planner/${blog._id}`} className="text-none"><p>{blog.caption}</p></a>
              </div>
            )
          })}
        </div>
      </div>

    </>
  );
}

export default Blog;
