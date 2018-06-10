
const nodemailer = require('nodemailer')

module.exports = function sendEmail(bet,userEmail) {


`<div>
<h1>World Cup 2018 bet</h1>
  <h3>Top 16:</h3>
  <p>${bet.top16}</p>
    <h3>Top 8:</h3>
    <p>${bet.top8}</p>
   <h3>Top 4:</h3>
   <p>${bet.top4}</p>
    <h3>Top 2:</h3>
    <p>${bet.top2}</p>
    <h3>Winner</h3>
    <p>${bet.winner}</p>

  
</div>`





  var maillist = userEmail


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nodeemailtest123@gmail.com',
      pass: 'juaua123'
    }
  })

  const mailOptions = {
    from: 'nodemdfgdfgdfgt123@gmail.com',
    to: maillist,
    subject: 'New Ap',
    html: text
  };


  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })


}




