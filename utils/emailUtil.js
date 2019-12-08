const { emailTransporter } = require("../startup");

module.exports.sendVerificationEmail = (to, verificationCode) => {
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to,
    subject: "Movie Bucket verification code",
    html: `<p>Verification code: <b>${verificationCode}</b></p>`
  };
  return emailTransporter.sendMail(mailOptions);
};
