import React, {useEffect} from 'react';
import AirportInfo from '../molecules/AirportInfo';
import Photos from '../molecules/Photos';
import {useSelector, useDispatch} from 'react-redux';
import {getPlaces} from '../../reducks/flights/selectors';
import {searchImages} from '../../reducks/images/operations';
import {getImages} from '../../reducks/images/selectors';

const DestinationInfo = () => {
  const dispatch = useDispatch();
  const places = useSelector(getPlaces);
  const images = useSelector(getImages);

  useEffect(() => {
    // places && dispatch(searchImages(places[0].legs[0].destination.city));
  }, [places, dispatch]);

  const showImages = () => {
    if (images.length > 0) {
      return (<Photos images={images} />);
    }
  };

  return (
    <>
      {/* <AirportInfo /> */}
      {showImages()}
    </>
  );
};

export default DestinationInfo;
