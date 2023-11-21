import { Formik } from 'formik';
import {
  Field,
  Form,
  SearchFormButton,
  SearchbarForm,
} from './Searchbar.style';
import { IoIosSearch } from 'react-icons/io';

export const Searchbar = ({ onSearch }) => {
  return (
    <Formik
      initialValues={{
        text: '',
      }}
      onSubmit={(values, actions) => {
        actions.resetForm();
        onSearch(values);
      }}
    >
      <SearchbarForm>
        <Form>
          <SearchFormButton type="submit">
            <IoIosSearch />
          </SearchFormButton>
          <Field
            name="text"
            type="text"
            placeholder="Search images and photos"
          />
        </Form>
      </SearchbarForm>
    </Formik>
  );
};
