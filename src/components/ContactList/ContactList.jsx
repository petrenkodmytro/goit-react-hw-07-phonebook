import { FaUserMinus } from 'react-icons/fa';
import { Item, List, ListBtnDel, Text } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectIsLoading,
  selectvisibleContacts,
} from 'redux/selectors';
import { useEffect } from 'react';
import { deleteContact, fetchContacts } from 'redux/operations';
import { Loader } from 'components/Loader/Loader';

export const ContactList = () => {
  // Отримуємо необхідну частину стану зі стору
  const visibleContacts = useSelector(selectvisibleContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  // Для того щоб сповістити сторінку про те, що в інтерфейсі відбулася якась подія, необхідно відправити екшен.
  // Екшени - це об'єкти, які передають дані з компонентів у стор, тим самим сигналізуючи про те, яка подія сталася в інтерфейсі. Вони являються єдиним джерелом інформації для стору.
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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
      {visibleContacts.length === 0 && (
        <Text>Sorry, there are no contacts in your PhoneBook.</Text>
      )}

      {/* помилка запиту */}
      {error && <Text>{error}</Text>}
    </>
  );
};
