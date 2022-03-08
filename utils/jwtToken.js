// Create token and saving in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  //option for cookie
  const options = {
    sameSite: "strict",
    path: "/",
    expires: new Date(Date.now + 5 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
  };
  res.status(statusCode).cookie("access_token", token, options).send({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
