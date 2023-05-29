import { FaUserMinus } from 'react-icons/fa';
import { Item, List, ListBtnDel } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  getContacts,
  getError,
  getFilter,
  getIsLoading,
} from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { Loader } from 'components/Loader/Loader';

export const ContactList = () => {
  // Отримуємо необхідну частину стану зі стору
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  // Для того щоб сповістити сторінку про те, що в інтерфейсі відбулася якась подія, необхідно відправити екшен.
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const normalizeFilter = filter.toLocaleLowerCase();
  const visibleContacts = contacts
    ?.filter(contact =>
      contact?.name?.toLocaleLowerCase().includes(normalizeFilter)
    )
    .sort((firstName, secondName) =>
      firstName.name.localeCompare(secondName.name)
    );

  const delContact = contactId => dispatch(deleteContact(contactId));

  return (
    <>
      {/* спінер */}
      <Loader isLoading={isLoading} />

      <List>
        {visibleContacts.map(item => (
          <Item key={item.id}>
            <span>{item.name}</span>
            <span>{item.number}</span>
            <ListBtnDel onClick={() => delContact(item.id)}>
              <FaUserMinus size="16" />
            </ListBtnDel>
          </Item>
        ))}
      </List>

      {/* якщо нема контактів */}
      {contacts.length === 0 && (
        <p>'Sorry, there are no contacts in your PhoneBook.'</p>
      )}

      {/* помилка запиту */}
      {error && <p>{error}</p>}
    </>
  );
};
