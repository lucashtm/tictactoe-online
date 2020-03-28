import React from 'react';
import Place from '../Place'

import './styles.scss';

export default function Board(props){
  const socket = props.socket;
  const enabled = props.enabled;
  return(
    <div className="board">
      <Place id={0} socket={socket} enabled={enabled} />
      <Place id={1} socket={socket} enabled={enabled} />
      <Place id={2} socket={socket} enabled={enabled} />
      <Place id={3} socket={socket} enabled={enabled} />
      <Place id={4} socket={socket} enabled={enabled} />
      <Place id={5} socket={socket} enabled={enabled} />
      <Place id={6} socket={socket} enabled={enabled} />
      <Place id={7} socket={socket} enabled={enabled} />
      <Place id={8} socket={socket} enabled={enabled} />
    </div>
  );
}