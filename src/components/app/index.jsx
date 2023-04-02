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


export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cards, setCards] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  }, [searchQuery]);



  function handleRequest() {
    api.search(searchQuery).then((dataSearch) => {
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
    api.changeLikeProductStatus(product._id, like)
      .then((updateCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === updateCard._id ? updateCard : cardState
        })

        setCards(newProducts)
      })
  }

  useEffect(() => {
    setIsLoading(true);
    api.getAllInfo()
      .then(([productsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setCards(productsData.products);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Header user={currentUser} onUserUpdate={handleUserUpdate}>
        <Routes>
          <Route path='/' element={
            <>
              <Logo />
              <Search
                handleInputChange={handleInputChange}
                handleFormSubmit={handleFormSubmit}
                handleSearchEscClick={handleSearchEscClick}
                searchQuery={searchQuery}
              />
            </>
          } />
          <Route path='*' element={<Logo href='/' />} />
        </Routes>
      </Header>
      <main className='content container'>
        <Routes>
          <Route path='/' element={<CatalogPage cards={cards} handleProductLike={handleProductLike} currentUser={currentUser} isLoading={isLoading} />} />
          <Route path='/faq' element={<FaqPage />} />
          <Route path='/product/:productID' element={<ProductPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>

        
      </main>
      <Footer />
    </>
  )
}