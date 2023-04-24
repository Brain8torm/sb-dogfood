import { useEffect, useState } from 'react';
import './styles.css';
import { Footer } from '../footer';
import { Header } from '../header';
import { Logo } from '../logo/index';
import { Search } from '../search-form/index';
import { isLiked, userReviews } from '../../utils/products';
import api from '../../utils/api';
import { CatalogPage } from '../../pages/catalog-page';
import { ProductPage } from '../../pages/product-page';
import FaqPage from '../../pages/faq-page';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { NotFoundPage } from '../../pages/not-fond-page';
import { UserContext } from '../../contexts/current-user-context';
import { CardsContext } from '../../contexts/cards-context';
import { useDebounce } from '../../hooks';
import { FavoritePage } from '../../pages/favorite-page';
import { SORT_TABS_ID } from '../../utils/config';
import { MobileBar } from '../mobile-bar';
import { Modal } from '../modal';
import { Login } from '../login';
import { Register } from '../register';
import { ResetPassword } from '../reset-password';

export function App() {
  const [cards, setCards] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentSort, setCurrentSort] = useState('');
  const [modalFormStatus, setModalFormStatus] = useState(true);

  const debounceSearchQuery = useDebounce(searchQuery, 300);

  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;

  function handleFormSubmit(e) {
    e.preventDefault();
    handleRequest();
  }

  function handleInputChange(dataInput) {
    setSearchQuery(dataInput);
    setIsTyping(true);
  }

  function handleSearchEscClick(e) {
    if (isTyping) {
      e.closest('form').querySelector('input[type="text"]').value = '';
      setSearchQuery('');
      setIsTyping(false);
      handleRequest();
    }
  }

  useEffect(() => {
    handleRequest();

  }, [debounceSearchQuery]);


  function handleRequest() {
    api.search(debounceSearchQuery).then((dataSearch) => {
      setCards(dataSearch);
    });
  }

  function handleUserUpdate(dataUserUpdate) {
    api.setUserInfo(dataUserUpdate)
      .then((updateUserFromServer) => {
        setCurrentUser(updateUserFromServer)
      })
  }

  function handleProductLike(product) {
    const like = isLiked(product.likes, currentUser._id)
    return api.changeLikeProductStatus(product._id, like)
      .then((updateCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === updateCard._id ? updateCard : cardState
        });

        setCards(newProducts);

        if (!like) {
          setFavorites(prevState => [...prevState, updateCard])
        } else {
          setFavorites(prevState => prevState.filter(card => card._id !== updateCard._id))
        }

        return updateCard;
      })
  }

  function handleProductReview(product, review) {
    let reviewData = { ...review };
    return api.setProductReview(product, reviewData)
      .then((updateCard) => {
        setCards && setCards(updateCard)
      });
  }

  const onCloseModalForm = () => {
    setModalFormStatus(false)
  }

  useEffect(() => {
    setIsLoading(true);
    api.getAllInfo()
      .then(([productsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setCards(productsData.products);

        const favoriteProduct = productsData.products.filter(item => isLiked(item.likes, userInfoData._id));

        setFavorites(favoriteProduct);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function sortedData(currentSort) {
    switch (currentSort) {
      case (SORT_TABS_ID.CHEAP): setCards(cards.sort((a, b) => a.price - b.price)); break;
      case (SORT_TABS_ID.LOW): setCards(cards.sort((a, b) => b.price - a.price)); break;
      case (SORT_TABS_ID.DISCOUNT): setCards(cards.sort((a, b) => b.discount - a.discount)); break;
      default: setCards(cards.sort((a, b) => b.price - a.price));
    }
  }

  const cbSubmitFormLoginRegister = (dataForm) => {
    console.log('cbSubmitFormLoginRegister', dataForm);
  }

  const cbSubmitFormLogin = (dataForm) => {
    console.log('cbSubmitFormLogin', dataForm);
  }

  const cbSubmitFormResetPassword = (dataForm) => {
    console.log('cbSubmitFormResetPassword', dataForm);
  }

  const handleClickButtonLogin = (e) => {
    e.preventDefault();
    navigate('/login', {
      replace: true,
      state: {
        backgroundLocation:
          { ...location, state: null }, initialPath
      }
    });
  };

  const handleClickButtonReset = (e) => {
    e.preventDefault();
    navigate('/reset-password', {
      replace: true,
      state: {
        backgroundLocation:
          { ...location, state: null }, initialPath
      }
    });
  };

  const handleClickButtonRegister = (e) => {
    e.preventDefault();
    navigate('/register', {
      replace: true,
      state: {
        backgroundLocation:
          { ...location, state: null }, initialPath
      }
    });
  };

  const handleClickButtonResetNotModal = (e) => {
    e.preventDefault();
    navigate('/reset-password');
  };

  const handleClickButtonRegisterNotModal = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  const handleClickButtonLoginNotModal = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const onCloseRoutingModal = () => {
    navigate(initialPath || '/', { replace: true })
  }

  return (
    <>
      <CardsContext.Provider value={{
        cards,
        favorites,
        currentSort,
        handleLike: handleProductLike,
        handleReview: handleProductReview,
        isLoading,
        onSortData: sortedData,
        setCurrentSort
      }} >
        <UserContext.Provider
          value={{ currentUser, onUserUpdate: handleUserUpdate }}
        >
          <Header>
            <Routes
              location={(backgroundLocation && {
                ...backgroundLocation, pathname: initialPath
              }) || location}>
              <Route path='/' element={
                <>
                  <Logo />
                  <Search
                    handleInputChange={handleInputChange}
                    handleFormSubmit={handleFormSubmit}
                    handleSearchEscClick={handleSearchEscClick}
                    searchQuery={debounceSearchQuery}
                  />
                </>
              } />
              <Route path='*' element={<Logo href='/' />} />
            </Routes>
          </Header>

          <main className='content container'>
            <Routes
              location={(backgroundLocation && {
                ...backgroundLocation, pathname: initialPath
              }) || location}>
              <Route path='/' element={<CatalogPage isLoading={isLoading} />} />
              <Route path='/faq' element={<FaqPage />} />
              <Route path='/favorite' element={<FavoritePage />} />
              <Route path='/product/:productID' element={<ProductPage />} />
              <Route path='/login' element={
                <Login
                  onSubmit={cbSubmitFormLogin}
                  onNavigateRegister={handleClickButtonRegisterNotModal}
                  onNavigateReset={handleClickButtonResetNotModal}
                />
              } />
              <Route path='/register' element={
                <Register
                  onSubmit={cbSubmitFormLoginRegister}
                  onNavigateLogin={handleClickButtonLoginNotModal}
                />
              } />
              <Route path='/reset-password' element={
                <ResetPassword onSubmit={cbSubmitFormResetPassword} />
              } />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>


          </main>
          <Footer />
          {backgroundLocation && <Routes>
            <Route path='/login' element={
              <Modal isOpen onClose={onCloseRoutingModal}>
                <Login
                  onSubmit={cbSubmitFormLogin}
                  onNavigateRegister={handleClickButtonRegister}
                  onNavigateReset={handleClickButtonReset} />
              </Modal>
            } />
            <Route path='/register' element={
              <Modal isOpen onClose={onCloseRoutingModal}>
                <Register
                  onSubmit={cbSubmitFormLoginRegister}
                  onNavigateLogin={handleClickButtonLogin} />
              </Modal>
            } />
            <Route path='/reset-password' element={
              <Modal isOpen onClose={onCloseRoutingModal}>
                <ResetPassword onSubmit={cbSubmitFormResetPassword} />
              </Modal>
            } />
          </Routes>}
          <MobileBar />
        </UserContext.Provider>
      </CardsContext.Provider>
    </>
  )
}