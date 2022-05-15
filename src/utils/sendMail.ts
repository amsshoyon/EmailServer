const nodemailer = require('nodemailer');
import * as config from 'config';
const oAuthConfig: any = config.get('oAuth');
const mailConfig: any = config.get('mailing');

const _config = {
    EMAIL_TO: mailConfig.to,
    EMAIL_FROM: mailConfig.from,
    PROJECT_ID: oAuthConfig.projectId,
    EMAIL_CLIENT_ID: oAuthConfig.clientId,
    EMAIL_CLIENT_SECRET: oAuthConfig.clientSecret,
    EMAIL_REFRESH_TOKEN: oAuthConfig.refreshToken
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
