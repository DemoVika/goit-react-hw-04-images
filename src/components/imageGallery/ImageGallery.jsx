import css from './imageGallery.module.css';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ cards, onCardClick }) => {
  return (
    <ul className={css.imageGallery}>
      {cards.map(card => {
        return (
          <div>
            <ImageGalleryItem
              key={card.id}
              webformatURL={card.webformatURL}
              onCardClick={onCardClick}
              largeImage={card.largeImageURL}
            />
          </div>
        );
      })}
    </ul>
  );
};
