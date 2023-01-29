import { Component } from 'react';
import { nanoid } from 'nanoid';

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
    name: '',
    number: '',
  };

  addContact = e => {
    e.preventDefault();
    const { name, number } = this.state;

    if (this.isDublicate(name, number)) {
      return alert(`${name} is already in contacts`);
    }

    this.setState(prevState => {
      const { name, number, contacts } = prevState;

      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { contacts: [newContact, ...contacts], name: '', number: '' };
    });
  };

  isDublicate(name, newNumber) {
    const normalizedName = name.toLowerCase();
    console.log(newNumber);
    const { contacts } = this.state;
    const dublicatedContacts = contacts.find(({ name, number }) => {
      return name.toLowerCase() === normalizedName && number === newNumber;
    });
    console.log(dublicatedContacts);

    return Boolean(dublicatedContacts);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  removeContact(id) {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  }

  render() {
    const { addContact, handleChange } = this;
    const { contacts, name, number } = this.state;
    const items = contacts.map(({ id, name, number }) => (
      <li key={id}>
        {name}: {number}{' '}
        <button onClick={() => this.removeContact(id)} type="button">
          Delete
        </button>
      </li>
    ));

    return (
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <h4>Phonebook</h4>
          <form action="" onSubmit={addContact}>
            <div className={styles.formElements}>
              <label htmlFor="">Name</label>
              <input
                value={name}
                name="name"
                onChange={handleChange}
                type="text"
                placeholder="Name"
              />
            </div>
            <div className={styles.formElements}>
              <label htmlFor="">Number</label>
              <input
                value={number}
                onChange={handleChange}
                name="number"
                type="text"
                placeholder="Number"
              />
            </div>
            <button className={styles.btn} type="submit">
              Add contact
            </button>
          </form>
        </div>
        <div className={styles.block}>
          <div className={styles.formElements}>
            <label htmlFor="">Find contacts by name</label>
            <input
              onChange={handleChange}
              name="filter"
              placeholder="Filter Contacts"
            />
          </div>
          <ul>{items}</ul>
        </div>
      </div>
    );
  }
}

export default ContactsBook;
