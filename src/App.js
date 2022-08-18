import React from 'react';
import { Collection } from './Collection';

import './index.scss';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];

function App() {
  const initialState = [{
    name: '',
    category: 0,
    photos: []
  }];
  const [collections, setCollections] = React.useState(initialState);
  const [searchValue, setSearchValue] = React.useState('');
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    setLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    fetch(`https://62fd4bebb9e38585cd500bc3.mockapi.io/photo-collection?page=${page}&limit=3&${category}`)
      .then((res) => res.json())
      .then((json) => setCollections(json))
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении данных');
      })
      .finally(() => setLoading(false));
  }, [categoryId, page]);
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          { cats.map((obj, index) => (
            <li
              key={ obj.name }
              className={ categoryId === index ? 'active' : '' }
              onClick={ () => setCategoryId(index) }
            >
              { obj.name }
            </li>
          )) }
        </ul>
        <input
          value={ searchValue }
          onChange={ (e) => { setSearchValue(e.target.value); } }
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        { isLoading
          ?
          <h2>Идёт загрузка ...</h2>
          :
          (
            collections
              .filter((obj) => {
                return obj.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
              })
              .map((obj, index) => (
                <Collection
                  key={ index }
                  name={ obj.name }
                  images={ obj.photos }
                />
              ))
          ) }
      </div>
      <ul className="pagination">
        {
          [...Array(3)].map((_, index) => (
            <li
              className={ page === (index + 1) ? 'active' : '' }
              onClick={ () => setPage(index + 1) }
            >
              { index + 1 }
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default App;
