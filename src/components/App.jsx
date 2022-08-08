import React from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";
import Modal from './Modal/Modal'
import LoadMore from "components/LoadMore/LoadMore"
import KEY from "servise/KEY";
import errorImg from "../images/errorImg.jpg"

import { LineWave } from  'react-loader-spinner'
import styles from "./styles.module.css"

class App extends React.Component {

  state = {
    request: "",
    image: [],
    showModal: false,
    page: 1,
    largeImageURL: '',
    tags: '',
    status: "idle",
    pending: null,
    total: "",
    error: null
  }

  async componentDidUpdate(prevProps, prevState) {
    const state = this.state;
      
      if (prevState.request !== state.request || prevState.page !== state.page) {
        try {
          this.setState({ pending: true })
          await fetch(`https://pixabay.com/api/?q=${state.request}&page=${state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
            .then(result => result.json())
            .then(data => {
              const array = data.hits.map(({ id, tags, webformatURL, largeImageURL }) =>
                ({ id, tags, webformatURL, largeImageURL }));
                
              if (data.hits.length === 0) {
                this.setState({ status: "rejected", error: true})
              }
              else {
                this.setState(prevState => ({
                  image: [...prevState.image, ...array],
                  status: "resolved",
                  pending: false,
                  total: data.total
                }));
              }
            })
        } catch (error) {
          console.log(error)
        } 
    }
  }
  onRequestSubmit = request => {
    this.state.request !== request &&
    this.setState({ request, page: 1, pending: false, error: false, image: [] })
  }
  onLoadMore = e => {
    e.preventDefault()
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  handleModalToggle = e => {
      if (e.currentTarget === e.target || e.code === 'Escape') {
        this.toggleModal();
      }
  };
  modalData = ({largeImageURL, tags}) => {
    this.setState({
        largeImageURL,
        tags,
    })
  }
  render() {
    const state = this.state;
    return (
      <div>
        <Searchbar onRequestSubmit={this.onRequestSubmit} />

        {state.status === "resolved" &&
          <ImageGallery
          images={state.image}
          loadMore={this.onLoadMore}
          onCloseModal={this.handleModalToggle}
          modalData={this.modalData}
          status={state.status} />
        }
        
        
        {state.showModal &&
          <Modal onCloseModal={this.handleModalToggle} >
            <img src={state.largeImageURL} alt={state.tags} width="800" />
          </Modal>
        }

        {state.status === "rejected" &&
          <div className={styles.loader}>
            <img src={errorImg} alt="Error" width="800" height="800" />
          </div> 
        }

        {state.pending && !state.error &&
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
        {state.status === "resolved" && state.image.length !== state.total &&
          <LoadMore loadMore={this.onLoadMore} /> } 
      </div>
    );
  };
}

export default App;

