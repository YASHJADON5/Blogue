import { useState, useRef } from 'react';
import RichTextEditor from '../components/RichTextEditor/RichtextEditor';
import Appbar from '../components/General/Appbar';

function PublishBlog() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  
  const handleTitleChange = () => {
    if (inputRef.current) {
      setTitle(inputRef.current.value); 
    }
  };
  
  const username= localStorage.getItem('username')||""


  return (
    <div>
      <Appbar name={username[0]||""} publish={"finalpublish"} title={title} content={content} id={""} />
      <div className='flex justify-center bg-white h-screen max-w-4xl mx-auto'>
        <div className="max-w-full w-full">
          <input
            ref={inputRef}
            onChange={handleTitleChange}
            className='w-full mx-auto bg-white outline-none border border-teal-800 p-4 h-20 text-4xl'
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
