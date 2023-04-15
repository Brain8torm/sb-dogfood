import { useEffect, useState } from 'react';
import './styles.css';
import { Footer } from '../footer';
import { Header } from '../header';
import { Logo } from '../logo/index';
import { Search } from '../search-form/index';
import { isLiked } from '../../utils/products';
import api from '../../utils/api';
import { CatalogPage } from '../../pages/catalog-page';
import { ProductPage } from '../../pages/product-page';
import FaqPage from '../../pages/faq-page';
import { Route, Routes } from 'react-router';
import { NotFoundPage } from '../../pages/not-fond-page';
import { UserContext } from '../../contexts/current-user-context';
import { CardsContext } from '../../contexts/cards-context';
import { useDebounce } from '../../hooks';
import { FavoritePage } from '../../pages/favorite-page';
import { SORT_TABS_ID } from '../../utils/config';
import { MobileBar } from '../mobile-bar';
import { RegisterForm } from '../form/register-form';


export function App() {
  const [cards, setCards] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentSort, setCurrentSort] = useState('');

  const debounceSearchQuery = useDebounce(searchQuery, 300);

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
        })

        setCards(newProducts);

        if (!like) {
          setFavorites(prevState => [...prevState, updateCard])
        } else {
          setFavorites(prevState => prevState.filter(card => card._id !== updateCard._id))
        }

        return updateCard;
      })
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

  function sortedData (currentSort) {
    switch (currentSort) {
      case (SORT_TABS_ID.CHEAP): setCards(cards.sort((a, b) => a.price - b.price)); break;
      case (SORT_TABS_ID.LOW): setCards(cards.sort((a, b) => b.price - a.price)); break;
      case (SORT_TABS_ID.DISCOUNT): setCards(cards.sort((a, b) => b.discount - a.discount)); break;
      default: setCards(cards.sort((a, b) => b.price - a.price));
    }
  }

  return (
    <>
      <CardsContext.Provider value={{
        cards,
        favorites,
        currentSort,
        handleLike: handleProductLike,
        isLoading,
        onSortData: sortedData,
        setCurrentSort
      }} >
        <UserContext.Provider value={{ currentUser, onUserUpdate: handleUserUpdate }}>
          <RegisterForm/>
          <Header>
            <Routes>
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
            <Routes>
              <Route path='/' element={<CatalogPage isLoading={isLoading} />} />
              <Route path='/faq' element={<FaqPage />} />
              <Route path='/favorite' element={<FavoritePage />} />
              <Route path='/product/:productID' element={<ProductPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>


          </main>
          <Footer />
          <MobileBar/>
        </UserContext.Provider>
      </CardsContext.Provider>
    </>
  )
}