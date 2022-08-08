import { useState } from "react"
import styles from "../styles.module.css"
import { ReactComponent as SearchIcon } from '../../images/search.svg'
import PropTypes from 'prop-types';


const Searchbar = ({onRequestSubmit}) => {

    const [request, setRequest] = useState("")


    const onInputChange = e => {
        setRequest(e.currentTarget.value);
    }

    const onInputSubmit = e => {
        e.preventDefault();
        if (request === "") {
            return alert("Enter request")
        }
        onRequestSubmit(request.toLocaleLowerCase());
        
        setRequest("")
    }

        return (
            <header className={styles.searchbar}>
                <form className={styles.searchForm} onSubmit={onInputSubmit}>
                    <button type="submit"
                        className={styles.searchFormButton}
                    >
                        <SearchIcon/>
                        <span className={styles.searchFormButtonLabel}></span>
                    </button>

                    <input
                    className={styles.searchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={onInputChange}
                    value = {request}
                    autofocus
                    />
                </form>
            </header>
        )
    }

export default Searchbar

Searchbar.propTypes = {
    onRequestSubmit: PropTypes.func.isRequired,
}