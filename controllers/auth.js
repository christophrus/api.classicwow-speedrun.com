exports.bnet = (req, res) => {
  const io = req.app.get('io');
  const user = {
    status: 'loggedIn',
    name: req.user.displayName
  };
  io.in(req.session.socketId).emit('bnet', user);
  res.end();
};
