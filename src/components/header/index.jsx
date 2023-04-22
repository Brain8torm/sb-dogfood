import styles from './header.module.css';
import classNames from 'classnames';
import { ReactComponent as FavoriteIcon } from './images/ic-favorites.svg';
import { ReactComponent as CartIcon } from './images/ic-cart.svg';
import { ReactComponent as ProfileIcon } from './images/ic-profile.svg';
import { Button } from '../button';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/current-user-context';
import { CardsContext } from '../../contexts/cards-context';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function Header({ children }) {
  const { currentUser, onUserUpdate } = useContext(UserContext);
  const { favorites } = useContext(CardsContext);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;


  const handleEditBtnClick = () => {
    onUserUpdate({ name: 'Андрей Кудряшов2', about: 'Веб-разработчик' })
  }

  const handleDropDownToggle = () => {
    if (isDropDownOpen) {
      setIsDropDownOpen(false);
    } else {
      setIsDropDownOpen(true);
    }
  }

  return (
    <header className={classNames(styles.section)}>
      <div className={classNames(styles.wrapper, 'container')}>
        {children}
        <div className={classNames(styles.icons)}>
          <Link to={{ pathname: '/favorite' }} className={classNames(styles.icon_link)}>
            <span className={classNames(styles.icon, 'header_icon__favorite')}><FavoriteIcon /></span>
            {favorites.length !== 0 &&
              <span className={classNames(styles.icon_bubble)}>{favorites.length}</span>
            }
          </Link>
          <span className={classNames(styles.icon, 'header_icon__cart')}><CartIcon /></span>
          <span className={classNames(styles.icon, 'header_icon__profile', 'dropdown-toggle')} onClick={handleDropDownToggle}>
            <ProfileIcon />
            <div className={classNames(styles.dropdown, { [styles.dropdown__open]: isDropDownOpen })}>
              {isAuth
                ?
                <>
                  <div>{currentUser?.name}</div>
                  <div>{currentUser?.about}</div>
                  <div>{currentUser?.email}</div>
                  <Button action={handleEditBtnClick}>
                    Изменить
                  </Button>
                </>
                :
                <Link to='/login' replace state={{ backgroundLocation: location, initialPath: location.pathname }}>Войти</Link>
            }

            </div>
          </span>
        </div>

      </div>
    </header>
  )
}