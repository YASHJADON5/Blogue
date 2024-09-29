import  {useRef } from 'react';
import JoditEditor from 'jodit-react';

function RichTextEditor({content,setContent}:{content:string,setContent:(value:string|"")=>void}) {
  const editor = useRef(null);


  const config:any = {
    minHeight: 700,
  };
  
  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}      
        config={config}
        onBlur={newContent => setContent(newContent)} 
      />
    </div>
  );
}

export default RichTextEditor;
