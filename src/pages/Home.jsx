import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/conf";
import { Container, PostCard } from "../components";
import blogImage from "../assets/blogpage.jpg";


const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if(posts){
        setPosts(posts.documents)
      }
    })
  }, [])


  if (posts.length === 0) {
    return (
      <div className="w-full h-screen flex flex-col lg:flex-row">
        {/* Left Side - Information */}
        <div
          className="w-full lg:w-1/2 flex flex-col justify-center items-start px-8 lg:px-16 text-white py-8"
          style={{
            background: "linear-gradient(135deg, #fdf4e3 0%, #f6d1c3 100%)",
            boxShadow: "inset 0 0 50px rgba(0, 0, 0, 0.2)",
            borderRight: "5px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 hover:text-red-700 transition duration-300 ease-in-out">
            Oops! It seems the posts are playing hide-and-seek.
          </h1>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            Maybe they’re on vacation, or you’re not logged in. 🛤️<br />
            Don’t worry! We’ve got your back.
          </p>
          <p className="mt-4 text-md text-gray-500">
            Sign in to bring them back, or be the hero who starts the first post!
          </p>
          <div className="mt-8">
            <button className="bg-blue-500 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out">
              Login Now
            </button>
          </div>
        </div>
  
        {/* Right Side - Image */}
        <div
          className="w-full lg:w-1/2 bg-cover bg-center h-96 lg:h-auto"
          style={{
            backgroundImage: `url(${blogImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    );
  }  
  

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div 
              key={post.$id} 
              className="p-2 w-1/4"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
};

export default Home;
