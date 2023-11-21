import { Component } from 'react';
import { Wrapper } from './App.style';
import { GlobalStyle } from './GlobalStyle';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImg } from './Servers/api';
import { LoadMoreButton } from './Button/Button';
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from './Loader/Loader';


export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    moreToWatch: false,
    perPage: 12,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page, perPage } = this.state;
    const newQuery = query.split('/')[1];
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const addImages = await fetchImg(newQuery, page);
        const totalPage = Math.ceil(addImages.totalHits / perPage);

        if (addImages.totalHits > 12) {
          this.setState({
            moreToWatch: true,
          });
        } else if (addImages.totalHits === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          this.setState({
            images: [],
          });
        }

        if (page >= totalPage) {
          this.setState({
            moreToWatch: false,
          });
          toast.success(
            'We`re sorry, but you`ve reached the end of search results.'
          );
        }
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...addImages.hits],
          };
        });
      } catch (error) {
        toast.error('Oops! Something wetn wrong :( Try to reload this page.');
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handelSubmit = newQuery => {
    if (newQuery.text === '') {
      toast.error(
        'The search string cannot be empty. Please specify your search query.'
      );
    } else {
      this.setState({
        query: `${Date.now()}/${newQuery.text}`,
        page: 1,
        images: [],
      });
    }
  };

  handelLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const { images, moreToWatch, isLoading } = this.state;
    return (
      <Wrapper>
        <Searchbar onSearch={this.handelSubmit} />
        {isLoading ? (
          <Loader/>
        ) : (
          <ImageGallery images={images} />
        )}

        {images.length > 0 && moreToWatch && (
          <LoadMoreButton onClick={this.handelLoadMore} />
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
  }
}


