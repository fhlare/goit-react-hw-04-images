import { useState } from 'react';
import { GalleryItem, ImageGallery } from './ImageGalleryItem.style';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ image, largeImg }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpen = () => {
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <GalleryItem onClick={onOpen}>
        <ImageGallery src={image} alt="" />
      </GalleryItem>
      <Modal largeImg={largeImg} isOpen={isModalOpen} isClose={onClose} />
    </>
  );
};
