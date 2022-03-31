const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {
        // Using gmail to send emails
        sendMail: (data) => {
            // Using gmail account and password in .env file
            const GMAIL_ACCOUNT = process.env.GMAIL_ACCOUNT;
            const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: GMAIL_ACCOUNT,
                    pass: GMAIL_PASSWORD
                }
            });
            // Error handling for sending email
            return new Promise((resolve,reject)=>{
                transporter.verify()
                    .then(()=>{
                        data.from = '"HubBoard" <' + GMAIL_ACCOUNT + '>';
                        transporter.sendMail(data)
                            .then(()=>{
                                resolve();
                            })
                            .catch((err)=>{
                                reject(err);
                            });
                    })
                    .catch(err=> {
                        reject(err);
                    })
                });
        },
        // Send a verification email to the user
        sendVerificationEmail : (email, verificationToken)=>{
            const SERVER_HOST = process.env.SERVER_HOST;
            const CLIENT_PORT = process.env.CLIENT_PORT;
            const mailOptions = {
                to: email,
                subject: 'Welcome to HubBoard',
                html: '<h1>Welcome to HubBoard!</h1>' +
                    '<p>You have successfully registered to HubBoard. ' +
                    'Please click the following link to verify your email address:</p>' +
                    '<a href="' + SERVER_HOST + ':' + CLIENT_PORT + '/auth/' + verificationToken + '">Verify Email</a>',
            };
            return module.exports.sendMail(mailOptions);
        },
        // Send a password reset email to the user
        sendPasswordResetEmail : (email, resetPasswordToken)=>{
            const SERVER_HOST = process.env.SERVER_HOST;
            const CLIENT_PORT = process.env.CLIENT_PORT;
            const mailOptions = {
                to: email,
                subject: 'Password Reset',
                html: '<h1>Password Reset</h1>' +
                    '<p>You have successfully requested a password reset. ' +
                    'Please click the following link to reset your password:</p>' +
                    '<a href="' + SERVER_HOST + ':' + CLIENT_PORT + '/auth/forgotpw/' + resetPasswordToken + '">Reset Password</a>',
            };
            return module.exports.sendMail(mailOptions);
        }
    }

