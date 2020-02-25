const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}))

const from = 'shop@node-complete.com'

module.exports = {
    sendMail(mail) {
        return transporter.sendMail({ from: from,  ...mail})
    }
}
