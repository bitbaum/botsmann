module.exports = async (req, res) => {
    console.log('Received request:', req.method);
    console.log('Request body:', req.body);

    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            console.log('Missing required fields');
            return res.status(400).json({ error: 'All fields are required.' });
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const consultation = new Consultation({
            name,
            email,
            message,
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        });
        
        console.log('Saving to database...');
        await consultation.save();
        console.log('Saved to database');

        console.log('Sending emails...');
        await transporter.sendMail({
            to: email,
            subject: 'Thanks for contacting Botsmann',
            html: `<p>Hello ${name},<br>We've received your message and will get back to you shortly.<br>Best, Botsmann Team</p>`,
        });

        await transporter.sendMail({
            to: process.env.EMAIL_TO,
            subject: 'New Consultation Request',
            html: `<p>Name: ${name}<br>Email: ${email}<br>Message: ${message}</p>`,
        });
        console.log('Emails sent');

        res.status(201).json({ message: 'Your consultation request has been received.' });
    } catch (error) {
        console.error('Error in API:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};