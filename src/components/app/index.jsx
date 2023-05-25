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
import { useDispatch, useSelector } from 'react-redux';
import { fetchChangeLikeProduct, fetchProducts, sortedProducts } from '../../storage/products/products-slice';
import { checkTokenUser, fetchUser, loginUser, registerUser } from '../../storage/user/user-slice';
import { ToastContainer } from 'react-toastify';
import { ProtectedRoute } from '../protected-route';
import { HomePage } from '../../pages/home-page';
import { getLocalData } from '../../utils/localStorage';

export function App() {
  // const [cards, setCards] = useState([]);
  const cards = useSelector(state => state.products.data);
  //const [favorites, setFavorites] = useState([]);
  //const [currentUser, setCurrentUser] = useState(null);
  const currentUser = useSelector(state => state.user.data);
  const [searchQuery, setSearchQuery] = useState('');
  const isLoading = useSelector(state => state.products.loading);
  const [isTyping, setIsTyping] = useState(false);
  const [currentSort, setCurrentSort] = useState('');
  const [modalFormStatus, setModalFormStatus] = useState(true);
  const dispatch = useDispatch();

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
      //setCards(dataSearch);
    });
  }

  function handleUserUpdate(dataUserUpdate) {
    api.setUserInfo(dataUserUpdate)
      .then((updateUserFromServer) => {
        //setCurrentUser(updateUserFromServer)
      })
  }

  function handleProductLike(product) {
    return dispatch.fetchChangeLikeProduct(product);
  }

  const onCloseModalForm = () => {
    setModalFormStatus(false)
  }

  const token = getLocalData('token')

  useEffect(() => {
      dispatch(checkTokenUser(token))
          .then(() => {
              if (token) {
                  console.log(currentUser);
                  dispatch(fetchProducts())
              }
          })
  }, [dispatch, token])




  const cbSubmitFormLoginRegister = (dataForm) => {
    console.log('cbSubmitFormLoginRegister', dataForm);
    dispatch(registerUser(dataForm));
  }

  const cbSubmitFormLogin = (dataForm) => {
    console.log('cbSubmitFormLogin', dataForm);
    dispatch(loginUser(dataForm));
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
          <Route path='/' element={
              <HomePage />
          } />
                    <Route path='/catalog' element={
            <ProtectedRoute>
              <CatalogPage />
            </ProtectedRoute>
          } />
          <Route path='/faq' element={<FaqPage />} />
          <Route path='/favorite' element={<FavoritePage />} />
          <Route path='/product/:productID' element={
            <ProtectedRoute><ProductPage /></ProtectedRoute>
          } />
          <Route path='/login' element={
            <ProtectedRoute onlyUnAuth>
              <Login
                onSubmit={cbSubmitFormLogin}
                onNavigateRegister={handleClickButtonRegisterNotModal}
                onNavigateReset={handleClickButtonResetNotModal}
              />
            </ProtectedRoute>
          } />
          <Route path='/register' element={
            <ProtectedRoute onlyUnAuth>
              <Register
                onSubmit={cbSubmitFormLoginRegister}
                onNavigateLogin={handleClickButtonLoginNotModal}
              />
            </ProtectedRoute>
          } />
          <Route path='/reset-password' element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword onSubmit={cbSubmitFormResetPassword} />
            </ProtectedRoute>
          } />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>


      </main>
      <Footer />
      {backgroundLocation && <Routes>
        <Route path='/login' element={
          <ProtectedRoute onlyUnAuth>
            <Modal isOpen onClose={onCloseRoutingModal}>
              <Login
                onSubmit={cbSubmitFormLogin}
                onNavigateRegister={handleClickButtonRegister}
                onNavigateReset={handleClickButtonReset} />
            </Modal>
          </ProtectedRoute>
        } />
        <Route path='/register' element={
          <ProtectedRoute onlyUnAuth>
          <Modal isOpen onClose={onCloseRoutingModal}>
            <Register
              onSubmit={cbSubmitFormLoginRegister}
              onNavigateLogin={handleClickButtonLogin} />
            </Modal>
            </ProtectedRoute>
        } />
        <Route path='/reset-password' element={
          <ProtectedRoute onlyUnAuth>
          <Modal isOpen onClose={onCloseRoutingModal}>
            <ResetPassword onSubmit={cbSubmitFormResetPassword} />
            </Modal>
            </ProtectedRoute>
        } />
      </Routes>}
      <MobileBar />
      <ToastContainer theme="colored" />
    </>
  )
}