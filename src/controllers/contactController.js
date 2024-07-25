const sendEmail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { salutation, name, email, company, message, privacy } = req.body;

  console.log(req.body); // Debugging

  if (privacy !== 'on') {
    console.log('Privacy policy not accepted');
    return res.status(400).json({ message: 'Datenschutzerklärung muss akzeptiert werden.' });
  }

  const encryptedMessage = encrypt(message);
  const timestamp = new Date();

  const contact = new Contact({
    salutation,
    name,
    email,
    company,
    message: encryptedMessage,
    privacy: true,
    timestamp,
  });

  try {
    await contact.save();
    console.log('Kontakt erfolgreich gespeichert');
  } catch (error) {
    console.error('Fehler beim Speichern des Kontakts:', error);
    return res.status(500).json({ message: 'Fehler beim Speichern des Kontakts.' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptionsToYou = {
    from: email,
    to: process.env.EMAIL,
    subject: `Neue Nachricht von ${salutation} ${name} (${company})`,
    html: `<p>${salutation} ${name} <br>(Unternehmen: ${company})<br> schrieb am ${moment(timestamp).format('DD.MM.YYYY HH:mm:ss')} folgende Nachricht:</p>
           <p>${message}</p>
           <p>Email: ${email}</p>
           <p style="font-size: 10px;">Dies ist eine automatisch erstellte Mail. Ihre Erstellung und ihre Zusendung wurde durch die Nutzung unseres auf unserer unternehmenseigenen Website befindlichen Kontaktformulars initiiert.</p>`
  };

  const salutationFormatted = salutation === "Herr" ? "Sehr geehrter Herr" : "Sehr geehrte Frau";
  const mailOptionsToSender = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Ihre Nachricht an Omega Security GmbH',
    html: `<p>${salutationFormatted} ${name},</p>
           <p>wir haben Ihre Nachricht erhalten und werden uns in Kürze bei Ihnen melden.</p>
           <p>Mit freundlichen Grüßen,<br>Omega Security GmbH</p>`
  };

  try {
    await transporter.sendMail(mailOptionsToYou);
    console.log('E-Mail an Sie erfolgreich gesendet');

    await transporter.sendMail(mailOptionsToSender);
    console.log('Bestätigungs-E-Mail erfolgreich gesendet');

    const successResponse = { message: 'E-Mail erfolgreich gesendet!' };
    console.log('Response:', successResponse);
    res.status(200).json(successResponse);
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    const errorResponse = { message: 'Fehler beim Senden der E-Mail.' };
    console.log('Response:', errorResponse);
    res.status(500).json(errorResponse);
  }
};
