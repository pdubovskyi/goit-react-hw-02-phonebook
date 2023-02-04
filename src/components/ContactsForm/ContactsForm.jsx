import { Component } from 'react';

import initialState from './initialState';
import styles from '../ContactsBooks/contacs-books.module.css';

class ContactsForm extends Component {
  state = { ...initialState };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({ ...initialState });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { name, number } = this.state;

    return (
      <form action="" onSubmit={handleSubmit}>
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
    );
  }
}

export default ContactsForm;
