import PropTypes from 'prop-types';
import styles from "../styles.module.css"

const LoadMore = ({loadMore}) => {
    return (
        <div className={styles.buttonWrapper}>
            <button type="button" onClick={loadMore} className={styles.button}>Load more</button>
        </div>
    )
}

export default LoadMore

LoadMore.propTypes = {
    loadMore: PropTypes.func.isRequired,
}