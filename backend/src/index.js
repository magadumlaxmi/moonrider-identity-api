const express = require('express');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const prisma = new PrismaClient();

// CORS
app.use(cors({
  origin: '*',
  methods: ['GET','POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Moonrider Identity API is live. Use POST /identify');
});

app.post('/identify', async (req, res) => {
  const { email, phoneNumber } = req.body;
  if (!email && !phoneNumber) return res.status(400).json({ error: 'At least one of email or phoneNumber is required.' });
  try {
    const contacts = await prisma.contact.findMany({
      where: { OR: [email ? { email } : undefined, phoneNumber ? { phoneNumber } : undefined].filter(Boolean) },
      orderBy: { createdAt: 'asc' }
    });

    let primaryContact = contacts.find(c => c.linkPrecedence === 'primary') || contacts[0];
    if (!primaryContact) {
      primaryContact = await prisma.contact.create({ data: { email, phoneNumber, linkPrecedence: 'primary' } });
    } else {
      const exists = contacts.some(c => 
        (email && c.email === email) || (phoneNumber && c.phoneNumber === phoneNumber)
      );
      if (!exists) {
        await prisma.contact.create({
          data: { email, phoneNumber, linkPrecedence: 'secondary', linkedId: primaryContact.id }
        });
      }
    }

    const linked = await prisma.contact.findMany({
      where: { OR: [{ id: primaryContact.id }, { linkedId: primaryContact.id }] }
    });

    const emails = Array.from(new Set(linked.map(c => c.email).filter(Boolean)));
    const phoneNumbers = Array.from(new Set(linked.map(c => c.phoneNumber).filter(Boolean)));
    const secondaryContactIds = linked.filter(c => c.linkPrecedence === 'secondary').map(c => c.id);

    res.json({ contact: { primaryContactId: primaryContact.id, emails, phoneNumbers, secondaryContactIds } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Run server (Render reads process.env.PORT)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}
