const nodemailer = require('nodemailer');
const _config = {
    PROJECT_ID: process.env.PROJECT_ID,
    EMAIL_TO: process.env.EMAIL_TO,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_CLIENT_ID: process.env.EMAIL_CLIENT_ID,
    EMAIL_CLIENT_SECRET: process.env.EMAIL_CLIENT_SECRET,
    EMAIL_REFRESH_TOKEN: process.env.EMAIL_REFRESH_TOKEN
};

const transporter = nodemailer.createTransport(
    {
        pool: true,
        service: 'Gmail',
        secure: false, // use SSL
        auth: {
            type: 'OAuth2',
            user: _config.EMAIL_TO,
            refreshToken: _config.EMAIL_REFRESH_TOKEN,
            clientId: _config.EMAIL_CLIENT_ID,
            clientSecret: _config.EMAIL_CLIENT_SECRET
        },
        tls: {
            rejectUnauthorized: false
        }
    },
    { from: _config.EMAIL_FROM }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
transporter.verify((error, success) => {
    if (error) return console.log('transporter:', error);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transporter.on('token', token => {
        // Something
    });
});

export const Mailer = message => {
    return transporter.sendMail(message);
};
