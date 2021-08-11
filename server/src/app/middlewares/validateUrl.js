module.exports = (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(404).json({ "error": "Resultado não encontrado." });
  }

  return next();
};