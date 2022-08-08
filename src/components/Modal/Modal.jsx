import styles from "../styles.module.css"
import { useEffect } from "react"
import PropTypes from 'prop-types';

const Modal = ({ onCloseModal, children}) => {
    
    useEffect(e => {
        window.addEventListener('keydown', onCloseModal)
        return () => {
            window.removeEventListener('keydown', onCloseModal)
        }
    })

        return(
            <div className={styles.overlay} onClick={onCloseModal} >
                <div className={styles.modal}>
                    {children}
                </div>
            </div>
        )
    }


export default Modal


Modal.propTypes = {
onCloseModal: PropTypes.func.isRequired,
}