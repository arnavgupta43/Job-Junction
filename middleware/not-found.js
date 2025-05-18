const notFound = (req, res) => {
  res.status(404).send(`Resource not found on this server`);
};
module.exports = notFound;
