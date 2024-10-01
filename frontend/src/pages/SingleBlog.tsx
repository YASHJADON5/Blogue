import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import spinner from '../assets/spinner.svg';
import Appbar from '../components/General/Appbar';
import BlogCard from '../components/Blogs-comp/BlogCard';

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
  savedBy: boolean;
}

interface Blogs {
  blogs: Blog[] | null;
}

interface RootState {
  blogs: Blogs;
}

interface SavedBlog {
  blogId: string;
  userId: string;
}

interface arrayOfSavedBlogs {
  savedBlogs: SavedBlog[]; // Correct array type definition here
}

interface RootSavedBlog{
  savedBlogs:arrayOfSavedBlogs;
}


function SingleBlog() {
  // Update selector to match the correct type definition
  // const savedBlogs = useSelector((state: RootSavedBlog) => state.savedBlogs); // Directly access savedBlog

  const [loading, setLoading] = useState(true);
  const selector = useSelector((state: RootState) => state.blogs);
  const [savedBlogIds, setSavedBlogIds] = useState<SavedBlog[]>([]);
  const [loadingSavedBlogs, setLoadingSavedBlogs] = useState(true);

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
  }, [selector.blogs, id]);

  useEffect(()=>{
    setLoadingSavedBlogs(true);
    (async()=>{

      try{
        const token= localStorage.getItem('token')

        const res = await axios.get(`${base_url}/api/v1/fetchSavedBlogs`, { headers: { "authorization": token } });               
        setSavedBlogIds(res.data);
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


  const isSaved = blog ? savedBlogIds.some((saved) => saved.blogId === blog.id) : false;

  return (
    <>
      <Appbar publish={'regular'} content={''} title={''} />
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
