import styles from './search-form.module.css';
import classNames from 'classnames';
import { ReactComponent as CloseIcon } from './images/ic-close-input.svg';
import { ReactComponent as SearchIcon } from './images/ic-search.svg';

export function Search({ handleInputChange, handleFormSubmit, handleSearchEscClick, searchQuery }) {

  return (
    <form className={classNames(styles.form)} onSubmit={handleFormSubmit}>
      <input type="text" className={classNames(styles.input)} placeholder='Поиск' onChange={(e) => {
        handleInputChange(e.target.value)
      }} />
      <button className={classNames(styles.btn)} type="submit" onClick={(e) => e.target}>
        <SearchIcon />
      </button>
      <button className={classNames(styles.esc, !searchQuery ? styles.esc__hidden : '')} type="button" onClick={(e) => {
        handleSearchEscClick(e.target);
      }}>
        <CloseIcon />
      </button>
    </form>
  )
}