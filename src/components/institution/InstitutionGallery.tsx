
import React from "react";

interface InstitutionGalleryProps {
  thumbnail: string;
  gallery: string[];
  name: string;
  activeImage: string | null;
  onImageClick: (imageSrc: string) => void;
}

const InstitutionGallery: React.FC<InstitutionGalleryProps> = ({
  thumbnail,
  gallery,
  name,
  activeImage,
  onImageClick,
}) => {
  return (
    <div className="mb-8">
      <div className="rounded-lg overflow-hidden mb-4">
        <img
          src={activeImage || thumbnail}
          alt={name}
          className="w-full h-96 object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        <img
          src={thumbnail}
          alt={`${name} thumbnail`}
          className={`h-24 w-full object-cover rounded-lg cursor-pointer ${!activeImage ? 'ring-2 ring-education-600' : ''}`}
          onClick={() => onImageClick(null)}
        />
        {gallery.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Gallery image ${index + 1}`}
            className={`h-24 w-full object-cover rounded-lg cursor-pointer ${activeImage === img ? 'ring-2 ring-education-600' : ''}`}
            onClick={() => onImageClick(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default InstitutionGallery;
