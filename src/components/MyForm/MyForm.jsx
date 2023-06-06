import styles from './MyForm.module.css';

export const MyForm = props => {
  const { handleChangeName, handleChangeNumber, handleSubmit } = props;

  return (
    <div>
      <form className={styles.contact} onSubmit={handleSubmit}>
        <label> Name</label>
        <input
          className={styles.contactInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Name"
          onChange={handleChangeName}
        />

        <label> Number</label>
        <input
          className={styles.contactInput}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Number"
          onChange={handleChangeNumber}
        />

        <div>
          <button className={styles.contactButton} type="submit">
            Add contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
