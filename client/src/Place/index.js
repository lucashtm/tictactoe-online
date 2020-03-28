import React, { useState } from 'react';
import { FiX, FiCircle } from 'react-icons/fi';

import './styles.scss';

export default function Place(props){

  const socket = props.socket;
  const id = props.id;
  const [marker, setMarker] = useState('');

  socket.on('setmarker', data => {
    if(data.id === id) setMarker(data.marker);
  });

  function submitRound(){
    if(props.enabled)
      socket.emit('place-click', { id: id });
  }

  return(
    <div className="place" onClick={submitRound}>
      {marker === 'x' &&
        <FiX size={16} color="#3e3c40" />
      }
      {marker === 'o' &&
        <FiCircle size={16} color="#3e3c40" />
      }
    </div>
  );
}