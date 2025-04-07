'use client';

import React from 'react';
import Image from 'next/image';
import PropTypes from "prop-types";

const UserImage = ({ 
  image, 
  alt, 
  width = 100, 
  height = 100,
  className = "" 
}) => {
  const [imageSrc, setImageSrc] = React.useState("");

  React.useEffect(() => {
    if (!image) {
      setImageSrc('/default-avatar.png');
    } else if (typeof image === 'string') {
      setImageSrc(image);
    } else {
      try {
        const base64 = Buffer.from(image).toString('base64');
        setImageSrc(`data:image/jpeg;base64,${base64}`);
      } catch (error) {
        console.error('Error converting image buffer to base64:', error);
        setImageSrc('/default-avatar.png');
      }
    }
  }, [image]);

  if (!imageSrc) {
    return null;
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

UserImage.propTypes = {
  image: PropTypes.oneOfType([PropTypes.instanceOf(Buffer), PropTypes.string, PropTypes.oneOf([null])]),
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default UserImage;