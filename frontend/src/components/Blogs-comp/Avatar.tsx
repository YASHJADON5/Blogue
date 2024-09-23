import React from 'react';

function Avatar({ name,hsize,wsize }: { name: string,hsize:string,wsize:string }) {
  return (
    <div className={`rounded-full ${hsize} ${wsize} bg-slate-300 flex items-center justify-center font-bold text-slate-500`}>
      {name}
    </div>
  );
}

export default Avatar;