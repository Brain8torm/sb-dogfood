import { Footer } from '../footer';
import { Header } from '../header';
import { CardList } from '../card-list';
import { Sort } from '../sort';
import { useEffect, useState } from 'react';
//import { dataCard } from '../../data';
import { Logo } from '../logo/index';
import { Search } from '../search-form/index';
import './styles.css';
import api from '../../utils/api';


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
      console.log('esc click');
      e.closest('form').querySelector('input[type="text"]').value = '';
      setSearchQuery('');
      setIsTyping(false);
      handleRequest();
    }
  }

  useEffect(() => {
    handleRequest();

  }, [searchQuery]);

  useEffect(() => {
    api.getAllInfo()
      .then(([productsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setCards(productsData.products);
      })
      .catch(err => console.log(err))
  }, []);

  function handleRequest() {
    api.search(searchQuery).then((dataSearch) => {
      setCards(dataSearch);
    });
  }

  return (
    <>
      <Header user={currentUser}>
        <Logo />
        <Search
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          handleSearchEscClick={handleSearchEscClick}
          searchQuery={searchQuery}
        />
      </Header>
      <main className='content container'>
        <Sort />
        <CardList goods={cards} />
      </main>
      <Footer />
    </>
  )
}