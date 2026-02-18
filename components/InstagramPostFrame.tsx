import React, { forwardRef } from 'react';
import { HeartIcon } from './icons/HeartIcon';
import { CommentIcon } from './icons/CommentIcon';
import { ShareIcon } from './icons/ShareIcon';
import { SaveIcon } from './icons/SaveIcon';
import { MoreHorizontalIcon } from './icons/MoreHorizontalIcon';

interface InstagramPostFrameProps {
  children: React.ReactNode;
  caption: string;
}

export const InstagramPostFrame = forwardRef<HTMLDivElement, InstagramPostFrameProps>(({ children, caption }, ref) => {
  const username = "your_brand_here";

  return (
    <div ref={ref} className="bg-black border border-gray-800 rounded-xl shadow-lg w-[420px] max-w-full overflow-hidden text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-0.5">
            <div className="bg-black h-full w-full rounded-full"></div>
          </div>
          <span className="text-sm font-semibold text-white ml-3">{username}</span>
        </div>
        <MoreHorizontalIcon />
      </div>

      {/* Content (Carousel Slide) */}
      <div className="flex justify-center bg-black">
        {children}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center p-3">
        <div className="flex space-x-4">
          <HeartIcon />
          <CommentIcon />
          <ShareIcon />
        </div>
        <div>
          <SaveIcon />
        </div>
      </div>
      
      {/* Likes */}
      <div className="px-3 pb-1">
          <p className="text-sm font-semibold">1,234 likes</p>
      </div>

      {/* Caption */}
      <div className="px-3 pb-3">
        <p className="text-sm text-white">
          <span className="font-semibold">{username}</span>
          {' '}
          {caption.split(' ').map((word, index) => 
            word.startsWith('#') ? <a key={index} href="#" className="text-blue-400 no-underline hover:underline">{word} </a> : `${word} `
          )}
        </p>
      </div>
    </div>
  );
});