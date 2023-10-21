import React from "react";

function PostCardSkeleton() {
  return (
    <div className="flex items-center min-h-full justify-between w-full p-1 sm:flex-col-reverse sm:items-start sm:justify-end gap-2 border-[1px] border-transparent">
      <div className="flex flex-col justify-start gap-2 h-full min-h-full max-w-[70%] sm:max-w-[100%]">
        <div className="bg-slate-400 w-20 h-5 rounded-lg animate-pulse" />
        <div className="bg-slate-400 w-52 h-5 rounded-lg animate-pulse" />
        <div className="bg-slate-400 w-52 h-5 rounded-lg animate-pulse" />
        <div className="bg-slate-400 w-52 h-1 rounded-lg animate-pulse" />
        <div className="bg-slate-400 w-44 h-3 rounded-lg animate-pulse" />
      </div>
      <div className="w-[80px] h-[80px] bg-slate-400 sm:w-full sm:h-52 lg:h-72 animate-pulse" />
    </div>
  );
}

export default PostCardSkeleton;
