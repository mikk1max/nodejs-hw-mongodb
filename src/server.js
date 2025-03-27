import express from 'express';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContacts, getContactById } from './services/contacts.js';
import { notFoundMiddleware } from './middlewares/notFound.js';
import { oopsErrorMiddleware } from './middlewares/oopsError.js';
import { logger } from './middlewares/pino.js';

const PORT = getEnvVar('PORT', '3000');

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(logger);

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:id', async (req, res) => {
    const contact = await getContactById(req.params.id);

    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contact.id}!`,
      data: contact,
    });
  });

  app.use('*', notFoundMiddleware);
  app.use(oopsErrorMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
