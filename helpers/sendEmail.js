import sgMail from '@sendgrid/mail';
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email, verificationToken, subjectText = '') => {
  //   const msg = {
  //     to: email,
  //     from: 'mail@gmail.com',
  //     subject: 'Подтверждение регистрации пользователя' + subjectText,
  //     text:
  //       'Для подтверждения почты - пожалуйста перейдите по ссылке http://localhost:4321/api/users/verify/' +
  //       verificationToken,
  //     html:
  //       '<p>Для подтверждения почты - пожалуйста перейдите по ссылке</p><p><a href="http://localhost:4321/api/users/verify/' +
  //       verificationToken +
  //       '">Please confirm your mail</a></p>',
  //   };
  //   sgMail
  //     .send(msg)
  //     .then(() => {
  //       console.log('Email sent');
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
};
export default sendEmail;
