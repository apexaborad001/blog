var nodemailer = require("nodemailer");
let sendEmail = async (dataTobeSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      var transport = nodemailer.createTransport({
        //   host: "smtp.gmail.com",
        service: "Gmail",
        port: 2525,
        auth: {
          user: "developer5gloryautotech@gmail.com",
          pass: "fsidlbanytkdzjib",
        },
      });

      var mailOptions = {
        from: "developer5gloryautotech@gmail.com",
        to: "apexaborad1234@gmail.com",
        subject: "Nice Nodemailer test",
        text:`${dataTobeSend}`,
      };

      const mails = transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
      });
    } catch (error) {
      console.log(error)
      reject(err)
    }finally{
      console.log("finallu")
      resolve("success!!")
    }
  });
};
module.exports = sendEmail;
