import React, { useState, useCallback, useEffect } from 'react';
import Ticket from '../components/organisms/Ticket';
import NewTicket from '../components/organisms/NewTicket';
import AirlineLogos from '../constants/airlineLogos.json';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { FirebaseTimestamp } from '../firebase/index';
import { addTicketToLiked, confirmTicket } from '../reducks/users/operations';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Button } from '../components/atoms';

const Tickets = (props) => {
  const dispatch = useDispatch();

  const {
    quotes,
  } = props;

  const _likeTicket = ({
    id, price, currencies, direct, departAirportCode, arriveAirportCode,
    departAirportName, arriveAirportName,
    outboundCarriers, inboundCarriers, outboundCarriersLogo, inboundCarriersLogo,
    outboundDepartureDate, inboundDepartureDate,
  }) => {
    const timestamp = FirebaseTimestamp.now();
    dispatch(addTicketToLiked({
      added_at: timestamp,
      id: id,
      price: price,
      currencies: currencies,
      direct: direct,
      departAirportCode: departAirportCode,
      arriveAirportCode: arriveAirportCode,
      departAirportName: departAirportName,
      arriveAirportName: arriveAirportName,
      outboundCarriers: outboundCarriers,
      inboundCarriers: inboundCarriers,
      outboundCarriersLogo: outboundCarriersLogo,
      inboundCarriersLogo: inboundCarriersLogo,
      outboundDepartureDate: outboundDepartureDate,
      inboundDepartureDate: inboundDepartureDate,
    }));
  };

  const _confirmTicket = ({
    id, price, currencies, direct, departAirportCode, arriveAirportCode,
    departAirportName, arriveAirportName,
    outboundCarriers, inboundCarriers, outboundCarriersLogo, inboundCarriersLogo,
    outboundDepartureDate, inboundDepartureDate,
  }) => {
    const timestamp = FirebaseTimestamp.now();
    dispatch(confirmTicket({
      added_at: timestamp,
      id: id,
      price: price,
      currencies: currencies,
      direct: direct,
      departAirportCode: departAirportCode,
      arriveAirportCode: arriveAirportCode,
      departAirportName: departAirportName,
      arriveAirportName: arriveAirportName,
      outboundCarriers: outboundCarriers,
      inboundCarriers: inboundCarriers,
      outboundCarriersLogo: outboundCarriersLogo,
      inboundCarriersLogo: inboundCarriersLogo,
      outboundDepartureDate: outboundDepartureDate,
      inboundDepartureDate: inboundDepartureDate,
    }));
  };

  // Message
  const toLikedList = useCallback(() =>
    dispatch(push('/user/liked')), [dispatch]);

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };
  const [open, setOpen] = useState(false);

  const showMessage = (props) => {
    setOpen(true);
  };

  const closeMessage = () => {
    setOpen(false);
  };

  const redirect = (url) => {
    window.open(url)
  }

  useEffect(() => {
    console.log(quotes)
  }, [quotes])

  return (
    <>
      {Object.values(quotes).map((quote => {
        return (
          <Ticket
            id={quote.id}
            deeplink={quote.deeplink}
            price={quote.pricing_options[0].price.amount}
            inboundOriginAirportName={quote.legs[0].origin.name}
            inboundOriginAirportCode={quote.legs[0].origin.displayCode}
            inboundDestinationAirportName={quote.legs[0].destination.name}
            inboundDestinationAirportCode={quote.legs[0].destination.displayCode}
            outboundOriginAirportName={quote.legs[1].origin.name}
            outboundOriginAirportCode={quote.legs[1].origin.displayCode}
            outboundDestinationAirportName={quote.legs[1].destination.name}
            outboundDestinationAirportCode={quote.legs[1].destination.displayCode}
          />
        )
      }))}

      <Snackbar open={open} autoHideDuration={6000} onClose={closeMessage}>
        <Alert onClose={closeMessage} severity="success">
          Added to <strong onClick={toLikedList}>liked list</strong>.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Tickets;
