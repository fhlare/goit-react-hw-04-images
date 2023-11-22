import { Component } from 'react';
import { GalleryItem, ImageGallery } from './ImageGalleryItem.style';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  onOpen = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  onClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };
  render() {
    const { isModalOpen } = this.state;
    const { image, largeImg } = this.props;
    return (
      <>
        <GalleryItem onClick={this.onOpen}>
          <ImageGallery src={image} alt="" />
        </GalleryItem>
        <Modal
          largeImg={largeImg}
          isOpen={isModalOpen}
          isClose={this.onClose}
        />
      </>
    );
  }
}
