import { useState } from 'react'
import Avatar from './Avatar'
import Circle from './Circle'
import { Link } from 'react-router-dom'
import saveIcon from '../../assets/saveIcon.svg'
import unsaveIcon from '../../assets/unssaveIcon.svg'
import spinner from '../../assets/spinner.svg'
import handleSave from '../../utils/handleSave'
import handleUnSave from '../../utils/handleUnSave'
import { useDispatch ,useSelector } from 'react-redux'
import { addmyBlogsSaved, addSavedBlogs, addSavedPageBlogs ,addSingleBlogSaved } from '../../store/savedBlogSlice'




const base_url= import.meta.env.VITE_BASE_URL
console.log(base_url)




interface blogId{
  blogId:string
}

interface User{
  name:string
}
interface blog{
  id:string,
  title:string,
  content:string,
  authorId:string,
  date:string,
  publish:boolean,
}


interface savedPageBlogsArray{
  blog:blog
  user:User 
}



interface innerRoot{
  savedBlogs:blogId[],
  savedPageBlogs:savedPageBlogsArray[],
  singleBlogSaved:string,
  myBlogsSaved:blogId[]
}


interface Root{
   savedBlogs:innerRoot
}








function BlogCard({
    AvatarName,
    name,
    publishDate,
    title,
    content,
    id,
    page,
    savedBlogs,
     
}:{ AvatarName:string,
    name:string,
    publishDate:string,
    title:string,
    content:string,
    id:string,
    page:string,
    savedBlogs:boolean,
    
    
    
}) {
  const dispatch=useDispatch();
  
  const myPageBlogSelector= useSelector((state:Root)=>state.savedBlogs.myBlogsSaved)
  const selector= useSelector((state:Root)=>state.savedBlogs.savedBlogs);
  const savedPageSelector= useSelector((state:Root)=>state.savedBlogs.savedPageBlogs);
  const singleBlogSavedSelector= useSelector((state:Root)=>state.savedBlogs.singleBlogSaved);

 
  const [loading,setLoading]=useState(false);


   
  const onSave= async()=>{
 
    await handleSave({setLoading,id})
    const arr=[...selector]
    if (arr.some(blog => blog.blogId === id)) return;
    arr.push({blogId:id});
    console.log(arr)

    if(!singleBlogSavedSelector&&page==='SingleBlog'){
      dispatch(addSingleBlogSaved(id))
    }
    dispatch(addSavedBlogs(arr))


    const myblogsSaved= [...myPageBlogSelector]
    if (myblogsSaved.some(blog => blog.blogId === id)) return;
    myblogsSaved.push({blogId:id})
    dispatch(addmyBlogsSaved(myblogsSaved))

  }


  const onUnSave= async()=>{

    await handleUnSave({setLoading,id})

    const result= selector.filter((blogId)=>blogId.blogId!==id)
    const resultSavedPageBlogs=  savedPageSelector.filter((blog)=>blog.blog.id!==id)
    if(singleBlogSavedSelector&&page==='SingleBlog'){
      dispatch(addSingleBlogSaved(""))
    }
    dispatch(addSavedPageBlogs(resultSavedPageBlogs))
    dispatch(addSavedBlogs(result))
    const res= myPageBlogSelector.filter((blogId)=>blogId.blogId!==id)
    dispatch(addmyBlogsSaved(res))


    
  }
  
  // console.log(singleBlogSavedSelector)


  



  if(loading){
    return(
      <div className='fixed inset-0 z-10 bg-white   flex justify-center items-center'>
              <div className='z-20'>
                {<img className='h-36 w-24' src={spinner}/>}
              </div>
     </div>
    )
}
  

    

  return (
    <div className='p-4 border-b border-slate-300'>
        <div className='flex items-center'>
                <div className='mb-1'>
                    <Avatar name={AvatarName} hsize='h-6' wsize='w-6' />
                </div>

                <div className='pl-2 text-sm mb-1'>
                    {name}
                </div>
                <div className='flex items-center  pl-2 h-5'>
                  <Circle />
                </div>
                <div className='pl-2 text-sm  mb-1 text-gray-400'>
                    {publishDate}
                </div>
        </div>
        {page !== 'myblogs' ? (
        <Link to={`/blog/${id}`}>
          <div className='pt-2 font-bold text-2xl font-sans hover:cursor-pointer'>
            {title}
          </div>
        </Link>
      ) : (
        <Link
          to={{
            pathname: `/blog/myblogs/${id}`,
          }}
        >
          <div className='pt-2 font-bold text-2xl font-sans hover:cursor-pointer'>
            {title}
          </div>
        </Link>
      )}
        <div className='text-gray-500 font-lg pt-2'>
              {page==="SingleBlog"?content:`${content.slice(0,150)}...`}
        </div>
         <div className='flex justify-between'>
              <div className='pt-2 text-gray-400 text-sm'>
              {`${Math.ceil(content.length/100)} minutes read`}
              </div>
              
              {!savedBlogs&&<div>
                 <img className='h-6 w-6 mt-2 ml-6' onClick={onSave} src={saveIcon} alt="" />
              </div>}
              {savedBlogs&&<div>
                  <img className='h-6 w-6 mt-2 ml-6' onClick={onUnSave} src={unsaveIcon} alt="" />
              </div>}
        </div>

    </div>
  )
}

export default BlogCard


// app.use(
//   cors({
//     origin: [process.env.FRONTEND_LOCAL_URL, process.env.FRONTEND_HOSTED_URL],
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true, // Allow credentials
//   })
// ); this is cors which is in app.js file
