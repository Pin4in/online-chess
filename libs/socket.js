const socketIO = require('socket.io');
const db = require('../db')

function socket(server) {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    io.emit('connected', socket.id);

    socket.on('start_game', data => {
      const id = data.id;
      const userId = data.userId;

      db('games')
        .where({
          'id': id,
        })
        .first()
        .then(game => {
          if(game.owner !== userId && game.competitorId !== userId) {
            socket.emit('game_not_found');
            console.log('socket:start_game - game_not_found')
            return;
          }
          const _game = {
            fen: game.fen,
            owner: game.owner === userId,
            competitorId: game.competitorId,
            side: game.ownerSide,
            title: game.title
          }
          socketRoom = game.id;
          socket.join(game.id);
          socket.emit('game_update', _game)
          console.log('socket:start_game - game_update', _game)
        })
    })

    socket.on('new_move', data => {
      console.log('socket new_move', data);
      const { id } = data;
      const { fen } = data;

      db('games')
        .where('id', id)
        .update({ fen })
        .then(done => {
          console.log('new fen', done);
          if (!done) {
            socket.emit('game_update_error');
            console.log('socket:new_move - game_update_error');
            return;
          }
          console.log('socket:new_move - game_update');
          io.to(socketRoom).emit('game_update', { fen });
        })

    })

    socket.on('disconnect', function(){
      // TODO: handle on disconnected
    });
  })
}

module.exports = socket;
