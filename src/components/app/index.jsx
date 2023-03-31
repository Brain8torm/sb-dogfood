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


export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cards, setCards] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
    api.getAllInfo()
      .then(([productsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setCards(productsData.products);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <>
      <Header user={currentUser} onUserUpdate={handleUserUpdate}>
        <Logo />
        <Search
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          handleSearchEscClick={handleSearchEscClick}
          searchQuery={searchQuery}
        />
      </Header>
      <main className='content container'>
        <ProductPage/>
        <CatalogPage cards={cards} handleProductLike={handleProductLike} currentUser={currentUser}/>
      </main>
      <Footer />
    </>
  )
}