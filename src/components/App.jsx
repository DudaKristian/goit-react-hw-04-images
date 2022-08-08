import { useState, useEffect } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";
import Modal from './Modal/Modal'
import LoadMore from "components/LoadMore/LoadMore"
import KEY from "servise/KEY";
import errorImg from "../images/errorImg.jpg"
import { LineWave } from  'react-loader-spinner'
import styles from "./styles.module.css"



const statuses = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

const App = () => {

  const [request, setRequest] = useState('');
  const [image, setImage] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState(statuses.IDLE);
  const [pending, setPending] = useState(null);
  const [total, setTotal] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!request) {
      return
    }

    try {
      setPending(true)
      fetch(`https://pixabay.com/api/?q=${request}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(result => result.json())
        .then(data => {
          const array = data.hits.map(({ id, tags, webformatURL, largeImageURL }) =>
            ({ id, tags, webformatURL, largeImageURL }));
              
          if (data.hits.length === 0) {
            setStatus(statuses.REJECTED);
            setError(true);
          } else {
            setImage(prevState => [...prevState, ...array]);
            setStatus(statuses.RESOLVED);
            setPending(false);
            setTotal(data.total);
          }
        })
    } catch (error) {
      setError(true)
    }
  }
    , [page, request]);
  
  const onRequestSubmit = requestNew => {
    if (request !== requestNew) {
      setRequest(requestNew)
      setPage(1)
      setPending(false)
      setError(false)
      setImage([])
    }
  }
  const onLoadMore = e => {
    e.preventDefault()
    setPage(prevState => prevState + 1)
  }
  const handleModalToggle = e => {
      if (e.currentTarget === e.target || e.code === 'Escape') {
        setShowModal(showModal => !showModal)
      }
  };
  const modalData = ({ largeImageURL, tags }) => {
    setLargeImageURL(largeImageURL)
    setTags(tags)
  }

    return (
      <div>
        <Searchbar onRequestSubmit={onRequestSubmit} />

        {status === statuses.RESOLVED &&
          <ImageGallery
          images={image}
          loadMore={onLoadMore}
          onCloseModal={handleModalToggle}
          modalData={modalData}
          status={status} />
        }
        
        
        {showModal &&
          <Modal onCloseModal={handleModalToggle} >
            <img src={largeImageURL} alt={tags} width="800" />
          </Modal>
        }

        {status === statuses.REJECTED &&
          <div className={styles.loader}>
            <img src={errorImg} alt="Error" width="800" height="800" />
          </div> 
        }

        {pending && !error &&
          <LineWave
            height="100"
            width="100"
            color="#3f51b5"
            ariaLabel="line-wave"
            wrapperStyle={{}}
            wrapperClass={styles.loader}
            visible={true}
            firstLineColor=""
            middleLineColor=""
            lastLineColor="" 
            />
        }
        {status === statuses.RESOLVED && image.length !== total &&
          <LoadMore loadMore={onLoadMore} /> } 
      </div>
    );
  };


export default App;

