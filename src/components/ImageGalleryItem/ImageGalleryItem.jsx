import PropTypes from 'prop-types';

import styles from "../styles.module.css"



const ImageGalleryItem = ({modalData, onCloseModal, id, tags, webformatURL, largeImageURL}) => {
    
    return (
        <li className={styles.imageGalleryItem}
            key={id}
            onClick={e => {
                onCloseModal(e)
                modalData({largeImageURL, tags})
                
            }
        
            }>
            <img src={webformatURL}
                alt={tags}
                key={id}
                className={styles.imageGalleryItemImage}
                onClick={onCloseModal}
            />
            
        </li>
    )
}

export default ImageGalleryItem

ImageGalleryItem.propTypes = {
    modalData: PropTypes.func.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
}