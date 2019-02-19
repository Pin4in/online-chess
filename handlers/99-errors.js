exports.init = app => app.use((err, req, res, next) => {
  if (err.status) {
    res
      .status(err.status)
      .send(err.message);
  } else {
    console.error(err.message, err.stack);
    res
      .status(500)
      .send('Internal Error');
  }
});
