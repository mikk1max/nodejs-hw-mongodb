import { sortList } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = sortList[0],
  filters = {},
}) => {
  const contactsQuery = ContactsCollection.find();

  if (filters.type) {
    contactsQuery.where('contactType').equals(filters.type);
  }

  if (filters.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filters.isFavourite);
  }

  const totalItems = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const data = await contactsQuery
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const paginationData = calcPaginationData({ page, perPage, totalItems });

  return {
    data,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const getContactById = async (id) => {
  const contact = await ContactsCollection.findById(id);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (id, body) => {
  const contact = await ContactsCollection.findByIdAndUpdate(id, body, {
    new: true,
  });
  return contact;
};

export const deleteContact = async (id) => {
  const contact = await ContactsCollection.findOneAndDelete({ _id: id });
  return contact;
};
