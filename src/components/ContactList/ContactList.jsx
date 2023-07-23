import { List, ListItem, Button, Data } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import { getContacts, getFilter } from 'redux/selectors';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filterValue = useSelector(getFilter);

  const dispatch = useDispatch();

  const getVisibleContacts = () => {
    const formatedFiltered = filterValue.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(formatedFiltered)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <List>
      {visibleContacts.map(({ id, name, number }, index) => {
        return (
          <ListItem key={id}>
            {`${index + 1})`}
            <Data>
              {name}: {number}
            </Data>
            <Button type="button" onClick={() => dispatch(deleteContact(id))}>
              Delete
            </Button>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ContactList;
