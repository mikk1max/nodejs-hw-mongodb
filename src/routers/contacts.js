import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  updateContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:id', ctrlWrapper(getContactByIdController));

contactsRouter.post('/', ctrlWrapper(createContactController));

contactsRouter.patch('/:id', ctrlWrapper(updateContactController));

contactsRouter.delete('/:id', ctrlWrapper(deleteContactController));

export default contactsRouter;
