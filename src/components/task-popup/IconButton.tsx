import React from 'react';

interface IconButtonProps {
  src: string;
  alt: string;
}

const IconButton: React.FC<IconButtonProps> = ({ src, alt }) => {
  return (
    <div className="flex gap-2.5 items-center self-stretch p-1 my-auto w-8">
      <img loading="lazy" src={src} alt={alt} className="object-contain self-stretch my-auto w-6 aspect-square" />
    </div>
  );
};

export default IconButton;