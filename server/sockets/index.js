/**
 * Created by kee on 15/10/30.
 */
export default (io)=>{

  io.on('connection', (socket)=>{
    socket.on('create:comment', (data)=>{
      socket.broadcast.emit('new:comment', data);
    });
    socket.on('create:post', (data)=>{
      socket.broadcast.emit('new:post', data);
    });
    socket.on('disconnect', ()=>{
      console.warn('socket disconnect');
    });
  });

};
