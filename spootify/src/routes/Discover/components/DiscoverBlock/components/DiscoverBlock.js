import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DiscoverItem from './DiscoverItem';
import api from '../../../../../config';
import '../styles/_discover-block.scss';
const { baseUrl } = api;
function scrollContainer(id, { isNegative } = {}) {
  return () => {
    const scrollableContainer = document.getElementById(id);
    const amount = isNegative ? -scrollableContainer.offsetWidth : scrollableContainer.offsetWidth;

    scrollableContainer.scrollLeft = scrollableContainer.scrollLeft + amount;
  };
}

export default function DiscoverBlock({ text, id , imagesKey = 'images' }) {
  const [data, setData] = useState([])
  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  useEffect(() => {
    switch(id){
      case 'released':
          fetch(`${baseUrl}/browse/new-releases`, {
            method: 'GET',
            headers: headers,
        }).then(response=>response.json()).then(data=> {
            setData(data.albums.items) 
        })
      break
      case 'featured':
        fetch(`${baseUrl}/browse/featured-playlists`, {
          method: 'GET',
          headers: headers,
      }).then(response=>response.json()).then(data=> {
          setData(data.playlists.items)
      })
      break
      case 'browse':
        fetch(`${baseUrl}/browse/categories `, {
          method: 'GET',
          headers: headers,
          }).then(response=>response.json()).then(data=> {
              setData(data.categories.items)
          })
        break
      default:
          break
    }
  }, []);
  return (
    <div className="discover-block">
      <div className="discover-block__header">
        <h2>{text}</h2>
        <span />
        {
          data.length ? (
            <div className="animate__animated animate__fadeIn">
              <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={scrollContainer(id, { isNegative: true })}
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                onClick={scrollContainer(id)}
              />
            </div>
          ) : null
        }
      </div>
      <div className="discover-block__row" id={id}>
        {data.map(({ [imagesKey]: images, name }) => (
          <DiscoverItem key={name} images={images} name={name} />
        ))}
      </div>
    </div>
  );
}
