import React, { useEffect } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import GetToken from '../../../DataAccess/auth';

  const Discover = () => {

    useEffect(() => {
      GetToken()
    }, []);
    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" />
        <DiscoverBlock text="BROWSE" id="browse" imagesKey="icons" />
      </div>
    );
  }

  export default Discover
    

