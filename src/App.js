import React, { useState } from 'react';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';

const API = '41283534-4829f00afc3272658e61d5192';

// class App extends Component {
//   state = {
//     searchWords: '',
//     images: [],
//     showModal: false,
//     modalImage: '',
//     showLoader: false,
//     currentPage: 1,
//   };

const App = () => {
  const [searchWords, setSearchWords] = useState('');
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleModal = () => {
    return setShowModal(!showModal);
  };

  const setModalImageFn = linkImg => {
    return setModalImage(linkImg);
  };

  const openLargeImage = linkImg => {
    setModalImageFn(linkImg);
    toggleModal();
  };

  const loaderToggle = bool => {
    return setShowLoader(bool);
  };

  const getImages = (words, page) => {
    loaderToggle(true);
    axios
      .get(
        `https://pixabay.com/api/?q=${words}&page=${page}&key=${API}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        pushImagesToState(response);
        loaderToggle(false);
        setCurrentPage(currentPage => currentPage + 1);
      });
  };

  const searchFormSubmit = event => {
    event.preventDefault();
    console.log('Wyszukano wyniki');
    setSearchWords('');
    setImages([]);
    setShowModal(false);
    setModalImage('');
    setCurrentPage(currentPage);
    console.log('Jestes na stronie numer ' + currentPage);

    const searchWordsValue = event.target[1].value;

    setSearchWords(searchWordsValue);
    const page = 1;
    getImages(searchWordsValue, page);
    event.target.reset();
  };

  const loadMoreFn = () => {
    loaderToggle(true);
    getImages(searchWords, currentPage);
  };

  const pushImagesToState = response => {
    const imagesFromResponse = response.data.hits;
    let newSearchArray = [];
    newSearchArray = [...images, ...imagesFromResponse];
    setImages(newSearchArray);
  };

  return (
    <div>
      <div className="App">
        <Searchbar onSubmit={searchFormSubmit} />
        {searchWords !== '' && (
          <ImageGallery
            loader={loaderToggle}
            imagesArray={images}
            modalFn={openLargeImage}
          ></ImageGallery>
        )}
        {showLoader && (
          <InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          />
        )}
        {searchWords !== '' && <Button fn={loadMoreFn} />}
      </div>
      <div className="modal-root">
        {showModal && (
          <Modal
            onClose={toggleModal}
            loader={loaderToggle}
            modalImage={modalImage}
          />
        )}
      </div>
    </div>
  );
};

export default App;
