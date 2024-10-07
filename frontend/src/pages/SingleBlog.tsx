import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import spinner from '../assets/spinner.svg';
import Appbar from '../components/General/Appbar';
import BlogCard from '../components/Blogs-comp/BlogCard';
import { useDispatch } from 'react-redux'
import { addSingleBlogSaved } from '../store/savedBlogSlice';
import client  from '../utils/openAi';


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

  const [loading, setLoading] = useState(false);
  const selector = useSelector((state: RootState) => state.blogs);
  // const [loadingSavedBlogs, setLoadingSavedBlogs] = useState(false);
  const dispatch= useDispatch()

  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);

  const [toggleSummary,setToggleSummary]=useState<boolean>()
  const [summary,setSummary]=useState<string>("")



  console.log("!@@",selector)

  useEffect(() => {
    console.log("tr")
    if (!selector.blogs) {
      setLoading(true);
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
    }
  }, [id, selector.blogs,singleBlogSavedSelector]);

  useEffect(()=>{
   
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

    })()

    return ()=>{dispatch(addSingleBlogSaved(""))}

  },[])

  const handleSummaryToggle=async()=>{
    setLoading(true);
    setToggleSummary(true)
    
    const gptQuery=`I have a blog with the following content: ${blog?.content}. Please create a concise summary of this blog in simple and easy-to-understand language, keeping it as very short as possible for users to quickly read and grasp the main points. If you're unable to generate a summary from this blog content, please return the message: 'Sorry, a summary cannot be formed for this blog. You can try another one.`
      
    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });
    const summ=chatCompletion.choices[0].message.content;
   
    setSummary(summ||"")

    setLoading(false);

  }


  if (loading) {
    return (
      <div className="h-screen w-screen absolute z-2 bg-purple-700 bg-opacity-80 flex justify-center items-center">
        <div className="z-3">
          <img className="h-36 w-24" src={spinner} />
        </div>
      </div>
    );
  }
   const username= localStorage.getItem('username')||""


  const isSaved = singleBlogSavedSelector!==""? true : false;

  return (
    <div>
      <Appbar name={username[0]||""}  id={''} publish={'regular'} content={''} title={''} />

      <div className="flex flex-col items-center mx-auto max-w-2xl">


      {toggleSummary && 

      <div className='text-[#515050] font-semibold text-2xl mt-16 shadow-2xl  w-full   p-4  '> 
      <h1 className='text-3xl text-center '>Summary</h1>

      <div className='mt-8 w-full '>
        {summary}   
      </div>
      </div>}





        {!toggleSummary&&blog&&(
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

      {!toggleSummary&&<button onClick={handleSummaryToggle}  type="button" className= " mt-8  text-white bg-[#4681f4] hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Summary</button>}

      </div>
    </div>
  );
}

export default SingleBlog;
