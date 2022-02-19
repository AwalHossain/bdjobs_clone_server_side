// Create token and saving in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  //option for cookie
  const options = {
    sameSite: "strict",
    path: "/",
    expires: new Date(Date.now + 5 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).send({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
