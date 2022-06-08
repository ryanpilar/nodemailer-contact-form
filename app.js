require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const path = require('path')
const cors = require('cors')

// template engine
const exphbs = require('express-handlebars')

const app = express()

// set up the view engine via handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
//bodyparser middleware
app.use(bodyParser.urlencoded( {extended: true}) )
app.use(bodyParser.json())
app.use(cors())

// we need to let express know that we want to use the public folder
// we are defining our static folder as the public folder so express knows where to look
app.use('/public', express.static( path.join(__dirname, 'public')) )

app.get('/', (req, res)=> res.render('contact', {layout: false}))
app.post('/send', (req, res) => {
    
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Company: ${req.body.company}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({

    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASS  // generated ethereal password
    },

    // don't reject if we are doing it from our local host
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data 
  let mailOptions = {
      from: process.env.MAIL_FROM, // sender address
      to: process.env.MAIL_USER, // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      
      // what we want to do once the form is submitted.
      // we are going to re render the contact form with a message
      res.render('contact', {msg:'Email has been sent'});
  });
});



app.listen(process.env.PORT || 3000, () => {
    console.log('running on port 3000')
})

