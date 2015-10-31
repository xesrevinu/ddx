/**
 * Created by kee on 15/9/28.
 */
import io from 'socket.io-client';
const socketHost = __DEVELOPMENT__ ? 'http://localhost:3000' : '//:3000';
const socket = io(socketHost);

socket.on('connect', ()=>{
  // console.log('socket connect');
});
socket.on('disconnect', ()=>{
  // console.log('socket connect');
});

export default socket;
