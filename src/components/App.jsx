import { useState, useEffect } from 'react';
import css from './app.module.css';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { apiRequest } from './api';
import { Button } from './button/Button';
import { Loader } from './loader/Loader';
import { Modal } from './modal/Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMore, setloadMore] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalImg, setModalImg] = useState('');

  useEffect(() => {
    if (query === '') return;

    setStatus('pending');
    apiRequest(query, currentPage)
      .then(response => {
        setCards(prevState => [...prevState, ...response.hits]);
        setStatus('resolved');
        setloadMore(currentPage < Math.ceil(response.totalHits / 12));
      })
      .catch(error => setStatus('rejected'));
  }, [query, currentPage]);

  const loadMoreFn = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const onSubmit = value => {
    setQuery(value);
    setCards([]);
    setCurrentPage(1);
  };

  const onCardClick = img => {
    setModal(true);
    setModalImg(img);
  };

  const closeModal = () => setModal(false);

  const galleryRender = () => {
    if (status === 'idle') {
      return <div>Введите тему</div>;
    }

    if (status === 'rejected') {
      return <div>Ошибка</div>;
    }

    if (status === 'resolved' || status === 'pending') {
      return <ImageGallery cards={cards} onCardClick={onCardClick} />;
    }
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={onSubmit} />
      {galleryRender()}
      {status === 'pending' && <Loader />}
      {status === 'resolved' && loadMore && (
        <Button loadMoreFn={loadMoreFn}></Button>
      )}
      {modal && <Modal modalImg={modalImg} closeModal={closeModal} />}
    </div>
  );
};
