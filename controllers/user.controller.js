export const getUser = (req, res) => {
  res.json({ email: req.user.email });
};
