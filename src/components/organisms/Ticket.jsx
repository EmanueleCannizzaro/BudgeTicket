import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import './Ticket.scss';
import {getIsSignedIn} from '../../reducks/users/selectors';
import {Button} from '../atoms';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const Ticket = (props) => {
  const {
    id,
    deeplink,
    price,
    inboundOriginAirportName,
    inboundOriginAirportCode,
    inboundDestinationAirportName,
    inboundDestinationAirportCode,
    outboundOriginAirportName,
    outboundOriginAirportCode,
    outboundDestinationAirportName,
    outboundDestinationAirportCode,

  } = props;

  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    caption: {
      color: '#616161',
      lineHeight: 1.25,
    },
  }));
  const classes = useStyles();

  return (
    <ul id={id}>
      <li><a href={deeplink}>{price}</a></li>
      <li>{inboundOriginAirportName} {inboundOriginAirportCode}</li>
      <li>{inboundDestinationAirportName} {inboundDestinationAirportCode}</li>
      <li>{outboundOriginAirportName} {outboundOriginAirportCode}</li>
      <li>{outboundDestinationAirportName} {outboundDestinationAirportCode}</li>
    </ul>
  );
};

export default Ticket;
