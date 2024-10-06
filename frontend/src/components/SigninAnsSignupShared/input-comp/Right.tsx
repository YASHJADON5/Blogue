

type rightProp={
    text:string
}

function Right({text}:rightProp) {
  return (
    <div className='bg-slate-200 h-screen z-2'>
          
    <div className='flex justify-center items-center h-screen'>
      <div className='w-3/4 text-2xl font-bold'>
      {text}
     
      <div className='text-lg pt-3'>Jules Winnfield</div>
      <div className='text-gray-500 text-sm '>CEO, Acme Inc</div>
      </div>
      
    </div>

</div>
  )
}

export default Right
