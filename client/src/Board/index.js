import React from 'react';
import Place from '../Place'

import './styles.scss';

export default function Board(props){
  return(
    <div className="board">
      <Place id={0} socket={props.socket} enabled={props.enabled} marker={props.structure[0]} />
      <Place id={1} socket={props.socket} enabled={props.enabled} marker={props.structure[1]} />
      <Place id={2} socket={props.socket} enabled={props.enabled} marker={props.structure[2]} />
      <Place id={3} socket={props.socket} enabled={props.enabled} marker={props.structure[3]} />
      <Place id={4} socket={props.socket} enabled={props.enabled} marker={props.structure[4]} />
      <Place id={5} socket={props.socket} enabled={props.enabled} marker={props.structure[5]} />
      <Place id={6} socket={props.socket} enabled={props.enabled} marker={props.structure[6]} />
      <Place id={7} socket={props.socket} enabled={props.enabled} marker={props.structure[7]} />
      <Place id={8} socket={props.socket} enabled={props.enabled} marker={props.structure[8]} />
    </div>
  );
}