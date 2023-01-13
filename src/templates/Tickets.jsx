import React, {useState, useCallback} from 'react';
import Ticket from '../components/organisms/Ticket';
import NewTicket from '../components/organisms/NewTicket';
import AirlineLogos from '../constants/airlineLogos.json';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import {FirebaseTimestamp} from '../firebase/index';
import {addTicketToLiked, confirmTicket} from '../reducks/users/operations';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {Button} from '../components/atoms';

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

  return (
    <>
      {Object.values(quotes).map((quote => {
        return (
          <div key={quote.id}>
            <div>
              {quote.price.formatted}
              <Button
                onClick={() => redirect(quote.deeplink)}
                label={'Select'}
                color={'primary'}
              />
              <ul>
                <li><img src={quote.legs[0].carriers.marketing[0].logoUrl} alt={quote.legs[0].carriers.marketing[0].name} /></li>
                <li>{quote.legs[0].origin.id}</li>
                <li>{quote.legs[0].origin.name}</li>
                <li>{quote.legs[0].departure}</li>
              </ul>
              <ul>
                <li>{quote.legs[0].destination.id}</li>
                <li>{quote.legs[0].destination.name}</li>
                <li>{quote.legs[0].arrival}</li>
              </ul>
              <ul>
                <li><img src={quote.legs[1].carriers.marketing[0].logoUrl} alt={quote.legs[1].carriers.marketing[0].name} /></li>
                <li>{quote.legs[1].origin.id}</li>
                <li>{quote.legs[1].origin.name}</li>
                <li>{quote.legs[1].departure}</li>
              </ul>
              <ul>
                <li>{quote.legs[1].destination.id}</li>
                <li>{quote.legs[1].destination.name}</li>
                <li>{quote.legs[1].arrival}</li>
              </ul>
            </div>
            <hr />
          </div>
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
