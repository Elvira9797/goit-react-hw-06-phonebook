import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import Notiflix from 'notiflix';
import * as Yup from 'yup';
import { FormContact, Label, Button, Input, Div } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const initialValues = {
    name: '',
    number: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(
        /^[a-zA-Z'-\s]+$/,
        'Name may contain only letters, apostrophe, dash and spaces.'
      )
      .required('Name is required'),
    number: Yup.string()
      .matches(
        /^[0-9\s+()-]+$/,
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      )
      .required('Number is required'),
  });

  const checkExistContact = name => {
    return contacts.find(contacts => contacts.name === name);
  };

  const handleSubmit = (values, { resetForm }) => {
    const isExist = checkExistContact(values.name);
    if (isExist) {
      Notiflix.Notify.failure(`${values.name} is already in contacts`);
      resetForm();
      return;
    }

    dispatch(addContact(values.name, values.number));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <FormContact>
        <Label>
          Name
          <Field type="text" name="name" as={Input} />
          <ErrorMessage name="name" component={Div} />
        </Label>
        <Label>
          Number
          <Field type="tel" name="number" as={Input} />
          <ErrorMessage name="number" component={Div} />
        </Label>
        <Button type="submit">Add contact</Button>
      </FormContact>
    </Formik>
  );
};

export default ContactForm;
