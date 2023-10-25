const nodeMailer = require('../config/nodemailer');
//this is another  method of exporting a method
exports.newComment = (comment) => {
    console.log('inside new Comment mailer');
    nodeMailer.transporter.send({
        from: 'pvtaryanbisht@gmail.com',

        to: comment.user.email,
        subject: "new Comment published",
        html: '<h1>Comment published<h1>'
    }, (err, info) => {
        if (err) {
            console.log('error in sending mail', err);
            return;
        }
        console.log('message sent', info);
        return;
    });
}