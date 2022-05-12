const nodemailer = require('nodemailer');
const _config = {
    PROJECT_ID: '486815242076',
    EMAIL: 'amsshoyon@gmail.com',
    EMAIL_CLIENT_ID: '3761349388-51e1sei9f6rp5u6djnv9ojr92mujh3e5.apps.googleusercontent.com',
    EMAIL_CLIENT_SECRET: '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',
    EMAIL_REFRESH_TOKEN: '1//04RU_JJ0nKs2rCgYIARAAGAQSNwF-L9IrCT7bPQzX5D3ecEKkqJE0KUd19-lci1AX21aC7u90xqDKuOzVgSaLdpqpGeqgv1xuQKo'
};

const transporter = nodemailer.createTransport(
    {
        pool: true,
        service: 'Gmail',
        secure: false, // use SSL
        auth: {
            type: 'OAuth2',
            user: _config.EMAIL,
            refreshToken: _config.EMAIL_REFRESH_TOKEN,
            clientId: _config.EMAIL_CLIENT_ID,
            clientSecret: _config.EMAIL_CLIENT_SECRET
        },
        tls: {
            rejectUnauthorized: false
        }
    },
    { from: 'ShareTrip Test Email' }
);

transporter.verify((error, success) => {
    if (error) {
        return console.log('transporter:', error);
    }
    // console.log('Server is ready for mailing: ', success);
    transporter.on('token', token => {
        console.log('User: %s', token.user);
        // console.log('Access Token: %s', token.accessToken)
        console.log('Expires: %s', new Date(token.expires));
    });
});

export const Mailer = message => {
    return transporter.sendMail(message);
};
