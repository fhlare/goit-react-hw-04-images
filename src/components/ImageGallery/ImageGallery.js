import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.style';

export const ImageGallery = ({ images }) => {
  return (
    <List>
      {images.map(({ id, webformatURL, largeImageURL }) =>(
        <ImageGalleryItem
          key={id}
          image={webformatURL}
          largeImg={largeImageURL}
        />
      ))}
    </List>
  );
};
