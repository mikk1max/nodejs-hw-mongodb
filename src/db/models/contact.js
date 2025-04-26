import { model, Schema } from 'mongoose';
import { contactType } from '../../constants/contacts.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      required: false,
      enum: [true, false],
    },
    contactType: {
      type: String,
      required: true,
      enum: contactType,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const contactsSortFields = ['name', 'phoneNumber', 'contactType'];

export const ContactsCollection = model('contacts', contactSchema);
