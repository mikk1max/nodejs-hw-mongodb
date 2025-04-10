import { contactType } from '../../constants/contacts.js';

export const parseContactsFilterParams = ({ type, isFavourite }) => {
  const parsedType = contactType.includes(type) ? type : undefined;
  const parsedIsFavourite =
    isFavourite === 'true' ? true : isFavourite === 'false' ? false : undefined;

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
