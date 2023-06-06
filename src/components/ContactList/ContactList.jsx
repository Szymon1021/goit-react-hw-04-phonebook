import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import styles from './ContactList.module.css';

export const ContactList = props => {
  const { contacts, deleteFunction } = props;
  const valuesList = contacts.map(input => {
    return (
      <li className={styles.contactlist} key={nanoid()}>
        {input.name}: {input.number}
        <button type="button" onClick={() => deleteFunction(input.id)}>
          delete
        </button>
      </li>
    );
  });
  return <ul className={styles.list}> {valuesList}</ul>;
};

ContactList.propTypes = {
  deleteFunction: PropTypes.func.isRequired,
};
