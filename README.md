# ☀️: nodemailer-contact-form
This is an interactive contact form that slides into view using css animation. When submitted, nodemail is used to send a SMTP email.

# 💪: Tech Deployed
node-express-css-nodemailer-handlebars

Notes:
- exphbs() did not work so exphbs.engine() was used instead
- res.render('contact') did not work, so res.render('contact', {layout: false}) was used instead
- remember to sign into Heroku, and adjust your env config settings. They need to be MANUALLY ADDED
- remember that if using a service like Outlook, that they have algo's that will flag you as spam. Just wait 5-10 minutes, and you'll recieve a security notification from Outlook asking you to verify the activity. Verify, and wait another 5 min, and then all should be good.

# 📸: Sample Wireframe:
![contact-form](https://user-images.githubusercontent.com/102194829/172731038-9d61b593-f758-49ef-87fd-ec8390db4069.png)


# 🔨: Improvements:

1. email form does not prevent multiple submissions. An event listener should be set up with a call back that restricts further button clicks
2. create a react app that holds state instead of leveraging main.handlebars
