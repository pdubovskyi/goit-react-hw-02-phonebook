import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactList from 'components/ContactList/ContactList';
import ContactsFilter from 'components/ContactsFilter/ContactsFilter';
import ContactsForm from 'components/ContactsForm/ContactsForm';
import styles from './contacs-books.module.css';

class ContactsBook extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    if (this.isDublicate(name, number)) {
      return alert(`${name} is already in contacts`);
    }

    this.setState(prevState => {
      const { contacts } = prevState;

      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { contacts: [newContact, ...contacts] };
    });
  };

  isDublicate(name, newNumber) {
    const normalizedName = name.toLowerCase();
    const { contacts } = this.state;
    const dublicatedContacts = contacts.find(({ name, number }) => {
      return name.toLowerCase() === normalizedName && number === newNumber;
    });

    return Boolean(dublicatedContacts);
  }

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  getContact() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) || number.includes(filter)
      );
    });
    return result;
  }

  render() {
    const { addContact, handleFilter, removeContact } = this;
    const contacts = this.getContact();

    return (
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <h4>Phonebook</h4>
          <ContactsForm onSubmit={addContact} />
        </div>
        <div className={styles.block}>
          <ContactsFilter handleChange={handleFilter} />
          <ContactList removeContact={removeContact} contacts={contacts} />
        </div>
      </div>
    );
  }
}

export default ContactsBook;
