import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import { useEffect, useState } from "react";
import axios from 'axios'
export default function Homepage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get('/posts');
      // fetch('/posts').then((e) => console.log(e)).catch((e) => console.log(e))
      console.log(res);
    }
    fetchPost();
  }, [])
  // const location = useLocation();
  // console.log(location);
  return (
    <>
      <Header />
      <div className="home">
        <Posts />
        <Sidebar />
      </div>
    </>
  );
}
