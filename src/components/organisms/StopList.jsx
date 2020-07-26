import React, { useState, useEffect } from "react";

const StopList = ({ quotes }) => {
  const [directFlights, setDirectFlights] = useState(0);
  const [indirectFlights, setIndirectFlights] = useState(0);

  useEffect(() => {
    let direct = 0,
        indirect = 0;
    quotes.map(quote => {
      quote.Direct ? direct++ : indirect++
    })
    setDirectFlights(direct);
    setIndirectFlights(indirect);
  }, [quotes])

  return (
    <>
    <ul>
      <li>Non-Stop:   {directFlights}</li>
      <li>With Stop: {indirectFlights}</li>
    </ul>
    </>
  );
};

export default StopList;
