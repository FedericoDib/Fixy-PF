router.post("/professional/create", async (req, res) => {
  const {
    googleId,
    name,
    email,
    perfilPic,
    enrollment,
    profession,
    province,
    city,
    address,
    availableTimes,
  } = req.body;

  await Professional.create({
    perfilPic,
    enrollment,
    profession,
    province,
    city,
    address,
    availableTimes,
    googleId,
    name,
    email,
  });
  res.send("profesional modified");
});

router.post("/client/create", async (req, res) => {
  const {
    googleId,
    name,
    email,
    phoneNumber,
    perfilPic,
    province,
    city,
    address,
  } = req.body;

  await Client.create({
    phoneNumber,
    perfilPic,
    province,
    city,
    address,
    googleId,
    name,
    email,
  });
  res.send("client modified");
});
