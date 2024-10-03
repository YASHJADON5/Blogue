

// import React, { useEffect, useState } from 'react';
// import Appbar from '../components/General/Appbar';
// import axios from 'axios';
// import spinner from '../assets/spinner.svg';
// import BlogCard from '../components/Blogs-comp/BlogCard';

// const base_url = import.meta.env.VITE_BASE_URL;

// function MyBlogs() {
  
//   const [myBlogs, setMyBlogs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [name, setName] = useState<string>("");
//   const [savedpost, setSavedPost] = useState([]);

//   useEffect(() => {
//     setLoading(true);
//     const token = localStorage.getItem('token');

//     const fetchMyBlogs = async () => {
//       try {
//         const response = await axios.get(`${base_url}/api/v1/user/myblogs`, {
//           headers: {
//             "authorization": token
//           }
//         });
//         setMyBlogs(response.data.Blogs);
//         setName(response.data.name);

//         const savedBlogs = await axios.get(`${base_url}/api/v1/fetchSavedBlogs`, { 
//           headers: { "authorization": token } 
//         });
//         setSavedPost(savedBlogs.data);
  
//       } catch (e) {
//         console.log("error while fetching my blogs", e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMyBlogs();
    
//   }, []);

//   const handleSaveToggle = async (blogId) => {
//     const token = localStorage.getItem('token');
    
//     try {
//       const isAlreadySaved = savedpost.some(saved => saved.blogId === blogId);

//       if (isAlreadySaved) {
//         await axios.post(`${base_url}/api/v1/unsaveBlog`, { blogId }, { headers: { "authorization": token } });
//         setSavedPost(savedpost.filter(saved => saved.blogId !== blogId));
//       } else {
//         await axios.post(`${base_url}/api/v1/saveBlog`, { blogId }, { headers: { "authorization": token } });
//         setSavedPost([...savedpost, { blogId }]);
//       }
//     } catch (e) {
//       console.log("Error saving/unsaving blog", e);
//     }
//   };

//   if (loading) {
//     return (
//       <div className='h-screen w-screen absolute z-2 bg-white bg-opacity-55 flex justify-center items-center'>
//         <div className='z-3'>
//           <img className='h-36 w-24' src={spinner} alt="Loading"/>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Appbar publish={'regular'} content='' title=''/>
//       {myBlogs.length > 0 && (
//         <div className="mx-auto max-w-2xl">
//           {myBlogs.map((blog, index) => {
//             const isSaved = savedpost.some(saved => saved.blogId === blog.id);
//             return (
//               <BlogCard
//                 key={index}
//                 savedBlogs={isSaved}
//                 content={blog.content}   
//                 AvatarName={name[0]}
//                 title={blog.title}
//                 name={name}
//                 publishDate={blog.date}
//                 id={blog.id}
//                 page={"myblogs"}
//                 onSaveToggle={() => handleSaveToggle(blog.id)} // Trigger save/unsave action
//               />
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default MyBlogs;
