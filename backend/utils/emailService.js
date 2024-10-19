import nodemailer from "nodemailer";
import createError from "http-errors";
import Config from "../configuration/config.js";

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: Config.email_user,
    pass: Config.email_password,
  },
});

// Function to send the reset password email
const sendResetPasswordEmail = async (email, resetToken) => {
  console.log("The reste token is ", resetToken);
  const resetUrl = resetToken;

  console.log("The reset link is ", resetUrl);

  const mailOptions = {
    from: Config.email_user,
    to: email,
    subject: "Password Reset Request",
    html: `
      <p>You requested for a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Reset password email sent to:", email);
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw createError(
      500,
      "Failed to send reset password email. Please try again."
    );
  }
};

export default sendResetPasswordEmail;
