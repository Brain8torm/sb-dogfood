import { Footer } from '../footer';
import { Header } from '../header';
import { CardList } from '../card-list';
import { Sort } from '../sort';
import { useEffect, useState } from 'react';
import { dataCard } from '../../data';
import { Logo } from '../logo/index';
import { Search } from '../search-form/index';
import './styles.css';


export function App() {

  const [searchQuery, setSearchQuery] = useState('');
  const [cards, setCards] = useState(dataCard);
  const [isTyping, setIsTyping] = useState(false);

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
    const filterCards = dataCard.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setCards(filterCards);
  }

  return (
    <>
      <Header>
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