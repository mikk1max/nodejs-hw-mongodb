import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { contactsSortFields } from '../db/models/contact.js';
import { parseContactsFilterParams } from '../utils/filters/parseContactsFilterParams.js';

export const getContactsController = async (req, res) => {
  const paginationParams = parsePaginationParams(req.query);
  const sortParams = parseSortParams(req.query, contactsSortFields);
  const filters = parseContactsFilterParams(req.query);
  filters.userId = req.user._id;

  const contacts = await getAllContacts({
    ...paginationParams,
    ...sortParams,
    filters,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const contact = await getContactById(req.params.id);

  if (!contact) {
    throw createHttpError(404, `Contact with id ${req.params.id} not found`);
  }

  if (String(contact.userId) !== String(req.user._id)) {
    throw createHttpError(
      403,
      'You do not have permission to access this resource.',
    );
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contact.id}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const userId = req.user._id;
  const contact = await createContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const updateContactController = async (req, res) => {
  const result = await updateContact(req.params.id, req.body);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a student!',
    data: result,
  });
};

export const deleteContactController = async (req, res) => {
  const contact = await deleteContact(req.params.id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
