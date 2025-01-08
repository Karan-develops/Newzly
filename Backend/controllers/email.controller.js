import nodemailer from "nodemailer";

export const sendEmail = async (req, res) => {
  const { toName = "", toEmail, subject, message } = req.body;

  try {
    // const transporter = nodemailer.createTransport({
    //   host: "gmail.com",
    //   service: "gmail",
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.PASSWORD,
    //   },
    // });

    // await transporter.sendMail({
    //   from: `Karan <${process.env.EMAIL}>`,
    //   to: `${toName} <${toEmail}>`,
    //   subject,
    //   text: message,
    // });

    res.status(200).json({
      message: "Successfully emailed",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
