'use client';

import React from 'react';
import Image from 'next/image';

interface UserImageProps {
  image: Buffer | string | null;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const UserImage: React.FC<UserImageProps> = ({ 
  image, 
  alt, 
  width = 100, 
  height = 100,
  className = "" 
}) => {
  const [imageSrc, setImageSrc] = React.useState<string>("");

  React.useEffect(() => {
    // Handle different image types
    if (!image) {
      // Use a default avatar if no image is provided
      setImageSrc('/default-avatar.png');
    } else if (typeof image === 'string') {
      // If image is already a string (path), use it directly
      setImageSrc(image);
    } else {
      // If image is a Buffer, convert it to base64
      try {
        // Convert Buffer to base64 string
        const base64 = Buffer.from(image).toString('base64');
        setImageSrc(`data:image/jpeg;base64,${base64}`);
      } catch (error) {
        console.error('Error converting image buffer to base64:', error);
        setImageSrc('/default-avatar.png');
      }
    }
  }, [image]);

  if (!imageSrc) {
    return null; // or a loading spinner
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        style={{ objectFit: 'cover' }}
        className="rounded-full"
      />
    </div>
  );
};

export default UserImage;