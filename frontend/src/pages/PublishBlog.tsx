import { useState, useRef } from 'react';
import RichTextEditor from '../components/RichTextEditor/RichtextEditor';
import Appbar from '../components/General/Appbar';
import { useNavigate } from 'react-router-dom';


function PublishBlog() {
  const token= localStorage.getItem('token')
  const navigate= useNavigate()
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  
  const handleTitleChange = () => {
    if (inputRef.current) {
      setTitle(inputRef.current.value); 
    }
  };
  
  const username= localStorage.getItem('username')||""
  if(!token){
    navigate('/signin')
  }



  return (
    <div>
      <Appbar name={username[0]||""} publish={"finalpublish"} title={title} content={content} id={""} />
      <div className='flex justify-center bg-white h-screen max-w-4xl mx-auto'>
        <div className="max-w-full w-full">
          <input
            ref={inputRef}
            onChange={handleTitleChange}
            className='w-full mx-auto bg-white outline-none border border-teal-800 p-2 h-12 md:p-4 md:h-20 text-xl md:text-4xl'
            placeholder='Title'
            type="text"
          />
          <RichTextEditor content={content} setContent={setContent} />
        </div>
      </div>
    </div>
  );
}

export default PublishBlog;
