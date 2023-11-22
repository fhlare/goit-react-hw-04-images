import { useEffect, useState } from 'react';
import { Wrapper } from './App.style';
import { GlobalStyle } from './GlobalStyle';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImg } from '../servers/api';
import { LoadMoreButton } from './Button/Button';
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [moreToWatch, setMoreToWatch] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }

    const newQuery = query.split('/')[1];
    async function getImages() {
      try {
        setIsLoading(true);
        const addImages = await fetchImg(newQuery, page);
        const totalPage = Math.ceil(addImages.totalHits / 12);

        if (addImages.totalHits > 12) {
          setMoreToWatch(true);
        } else if (addImages.totalHits === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          setImages([]);
        }

        if (page >= totalPage) {
          setMoreToWatch(false);
          toast.success(
            'We`re sorry, but you`ve reached the end of search results.'
          );
        }
        setImages(prevState => [...prevState, ...addImages.hits]);
      } catch (error) {
        toast.error('Oops! Something wetn wrong :( Try to reload this page.');
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  const handelSubmit = newQuery => {
    if (newQuery.text === '') {
      toast.error(
        'The search string cannot be empty. Please specify your search query.'
      );
    } else {
      setQuery(`${Date.now()}/${newQuery.text}`);
      setPage(1);
      setImages([]);
    }
  };

  const handelLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Wrapper>
      <Searchbar onSearch={handelSubmit} />
      {isLoading ? <Loader /> : <ImageGallery images={images} />}

      {images.length > 0 && moreToWatch && (
        <LoadMoreButton onClick={handelLoadMore} />
      )}
      <GlobalStyle />
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </Wrapper>
  );
};
