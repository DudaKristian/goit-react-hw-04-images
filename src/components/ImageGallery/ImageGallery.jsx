import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem"

import styles from "../styles.module.css"
import PropTypes from 'prop-types';

const ImageGallery = ({modalData, images, onCloseModal}) => {
    return (
        <div className={styles.imageGalleryWrapper}>
            <ul className={styles.imageGallery}>
            {images.map(({id, tags, webformatURL, largeImageURL}) => 
                <ImageGalleryItem
                tags={tags}
                    id={id}
                    key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}               
                onCloseModal={onCloseModal}
                modalData={modalData}
                />
            )}
            </ul>
        </div>
        
    )
}

export default ImageGallery

ImageGallery.propTypes = {
    modalData: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.number.isRequired,
        tags: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,   
    })),
    onCloseModal: PropTypes.func.isRequired,
}