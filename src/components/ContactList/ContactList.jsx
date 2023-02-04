const ContactList = ({ removeContact, contacts }) => {
  const items = contacts.map(({ id, name, number }) => (
    <li key={id}>
      {name}: {number}{' '}
      <button onClick={() => removeContact(id)} type="button">
        Delete
      </button>
    </li>
  ));

  return <ul>{items}</ul>;
};

ContactList.defaultProps = {
  contacts: [],
};

export default ContactList;
