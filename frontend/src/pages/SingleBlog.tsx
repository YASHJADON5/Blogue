import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import spinner from '../assets/spinner.svg';
import Appbar from '../components/General/Appbar';
import BlogCard from '../components/Blogs-comp/BlogCard';
import { useDispatch } from 'react-redux'
import { addSingleBlogSaved } from '../store/savedBlogSlice';


const base_url = import.meta.env.VITE_BASE_URL;

interface Author {
  name: string;
}

interface Blog {
  title: string;
  content: string;
  date: string;
  author: Author;
  id: string;
}

interface Blogs {
  blogs: Blog[] | null;
}

interface RootState {
  blogs: Blogs;
}




interface blogId{
  blogId:string
}


interface User{
  name:string
}


interface savedPageBlogsArray{
  id:string,
  title:string,
  content:string,
  authorId:string,
  date:string,
  publish:boolean,
  user:User 
}



interface innerRoot{
  savedBlogs:blogId[],
  savedPageBlogs:savedPageBlogsArray[],
  singleBlogSaved:string,
}

interface Root{
   savedBlogs:innerRoot
}





function SingleBlog() {
  const singleBlogSavedSelector = useSelector((state:Root) => state.savedBlogs.singleBlogSaved);

  const [loading, setLoading] = useState(true);
  const selector = useSelector((state: RootState) => state.blogs);
  const [loadingSavedBlogs, setLoadingSavedBlogs] = useState(true);
  const dispatch= useDispatch()

  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (!selector.blogs) {
      const fetchBlog = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(`${base_url}/api/v1/blog/${id}`, {
            headers: { authorization: token },
          });
          setBlog(response.data);
        } catch (e) {
          console.log('Error fetching blog', e);
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    } else {
      const filteredBlog = selector.blogs.find((blog) => blog.id === id);
      setBlog(filteredBlog || null);
      setLoading(false);
    }
  }, [selector.blogs, id,singleBlogSavedSelector]);

  useEffect(()=>{
    setLoadingSavedBlogs(true);
    (async()=>{

      try{
        const token= localStorage.getItem('token')

        const res = await axios.get(`${base_url}/api/v1/fetchSavedBlogs`, { headers: { "authorization": token } });               
        const isSaved=res.data.filter((blog:blogId)=>{
              if(blog.blogId===id){
                return blog.blogId;
              }
        })
        if(isSaved.length!==0){
          dispatch(addSingleBlogSaved(id))
        }
        console.log(res.data)
        
      }
      catch(e){
           console.log(e)
      }
      finally{
        setLoadingSavedBlogs(false);
      }

    })()

  },[])



  if (loading|| loadingSavedBlogs) {
    return (
      <div className="h-screen w-screen absolute z-2 bg-white bg-opacity-55 flex justify-center items-center">
        <div className="z-3">
          <img className="h-36 w-24" src={spinner} />
        </div>
      </div>
    );
  }


  const isSaved = singleBlogSavedSelector!==""? true : false;

  return (
    <>
      <Appbar id={''} publish={'regular'} content={''} title={''} />
      <div className="mx-auto max-w-2xl">
        {blog && !loadingSavedBlogs&&(
          <BlogCard            
            savedBlogs={isSaved}
            AvatarName={blog.author.name[0] || ''}
            name={blog.author.name || ''}
            publishDate={blog.date || ''}
            title={blog.title || ''}
            content={blog.content || ''}
            id={blog.id || ''}
            page={'SingleBlog'}
          />
        )}
      </div>
    </>
  );
}

export default SingleBlog;
