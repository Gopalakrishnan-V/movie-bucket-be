const { emailTransporter } = require("../startup");

module.exports.sendVerificationEmail = (to, verificationCode) => {
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to,
    subject: "Movie Bucket verification code",
    html: `<div style="text-align:center;
    margin-top: 24px;
    border-top:20px;
    border: 4px solid #001433;
    border-top-width: 60px;
    border-radius: 10px;
    float: center;
    width: 50%;
    margin: auto;">
    <p style="color:#002966">Your OTP:</p>
    <h1  style="color:#0066ff">${verificationCode}</h1>
    <p style="color:#000A1A">Valid for 5 minutes</p>
    <div>`
  };
  return emailTransporter.sendMail(mailOptions);
};
