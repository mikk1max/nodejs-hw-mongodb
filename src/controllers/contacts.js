import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/params/parsePaginationParams.js';
import { parseSortParams } from '../utils/params/parseSortParams.js';
import { contactsSortFields } from '../db/models/contact.js';
import { parseContactsFilterParams } from '../utils/filters/parseContactsFilterParams.js';
import { saveFile } from '../utils/saveFile/saveFile.js';

export const checkUserId = async (req) => {
  const contact = await getContactById(req.params.id);

  if (!contact || String(contact.userId) !== String(req.user._id)) {
    throw createHttpError(404, `Contact with id ${req.params.id} is not found`);
  }

  return contact;
};

export const getContactsController = async (req, res) => {
  const paginationParams = parsePaginationParams(req.query);
  const sortParams = parseSortParams(req.query, contactsSortFields);
  const filters = {
    ...parseContactsFilterParams(req.query),
    userId: req.user._id,
  };

  const contacts = await getAllContacts({
    ...paginationParams,
    ...sortParams,
    filters,
  });

  if (!Array.isArray(contacts.data) || contacts.data.length === 0) {
    res.status(200).json({
      status: 200,
      message: 'No contacts found!',
      data: contacts,
    });
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const contact = await checkUserId(req);

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contact.id}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const userId = req.user._id;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    photoUrl = await saveFile(photo);
  }

  const contact = await createContact({ ...req.body, userId, photo: photoUrl });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const updateContactController = async (req, res) => {
  await checkUserId(req);

  const photo = req.file;

  let photoUrl;

  if (photo) {
    photoUrl = await saveFile(photo);
  }

  const result = await updateContact(req.params.id, {
    ...req.body,
    photo: photoUrl,
  });

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
  await checkUserId(req);

  const deletedContact = await deleteContact(req.params.id);

  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
