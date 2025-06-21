const express = require('express');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// ✅ Home Route - to avoid "Cannot GET /"
app.get('/', (req, res) => {
  res.send('✅ Moonrider Identity API is live. Use POST /identify');
});

// ✅ Main Identity Reconciliation Route
app.post('/identify', async (req, res) => {
  const { email, phoneNumber } = req.body;

  if (!email && !phoneNumber) {
    return res.status(400).json({ error: 'At least one of email or phoneNumber is required.' });
  }

  try {
    const contacts = await prisma.contact.findMany({
      where: {
        OR: [
          email ? { email } : undefined,
          phoneNumber ? { phoneNumber } : undefined
        ].filter(Boolean)
      },
      orderBy: { createdAt: 'asc' }
    });

    let primaryContact = null;
    let allContacts = [...contacts];

    if (contacts.length === 0) {
      const newPrimary = await prisma.contact.create({
        data: {
          email,
          phoneNumber,
          linkPrecedence: 'primary'
        }
      });
      primaryContact = newPrimary;
      allContacts = [newPrimary];
    } else {
      primaryContact = contacts.find(c => c.linkPrecedence === 'primary') || contacts[0];

      const alreadyExists = contacts.some(c =>
        (email && c.email === email) && (phoneNumber && c.phoneNumber === phoneNumber)
      );

      if (!alreadyExists) {
        const newSecondary = await prisma.contact.create({
          data: {
            email,
            phoneNumber,
            linkPrecedence: 'secondary',
            linkedId: primaryContact.id
          }
        });
        allContacts.push(newSecondary);
      }
    }

    const linkedContacts = await prisma.contact.findMany({
      where: {
        OR: [
          { id: primaryContact.id },
          { linkedId: primaryContact.id }
        ]
      }
    });

    const emails = [...new Set(linkedContacts.map(c => c.email).filter(Boolean))];
    const phoneNumbers = [...new Set(linkedContacts.map(c => c.phoneNumber).filter(Boolean))];
    const secondaryContactIds = linkedContacts
      .filter(c => c.linkPrecedence === 'secondary')
      .map(c => c.id);

    res.status(200).json({
      contact: {
        primaryContactId: primaryContact.id,
        emails,
        phoneNumbers,
        secondaryContactIds
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Export app for testing
module.exports = app;

// ✅ Run server only when not testing
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}
