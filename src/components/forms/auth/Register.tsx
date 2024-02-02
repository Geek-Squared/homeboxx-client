import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useStore } from '../../../customHooks/auth';
import AuthButtons from '../../buttons/auth';

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
});

const RegisterForm: React.FC = () => {
  const initialValues: RegisterFormValues = { username: '', email: '', password: '', firstName: '', lastName: '' };
  const register = useStore(state => state.register);

  return (
    <>
      <h2>Sign Up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          register(values)
            .then(() => {
              window.location.href = '/';
              setSubmitting(false)
            })
            .catch((error) => {
              console.log(error);
              setSubmitting(false);
            });
        }}
      >
        <Form>
          <label>
            Username
            <Field type="text" name="username" />
            <ErrorMessage name="username" component="div" />
          </label>

          <label>
            Email
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </label>

          <label>
            Password
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </label>

          <label>
            First Name
            <Field type="text" name="firstName" />
            <ErrorMessage name="firstName" component="div" />
          </label>

          <label>
            Last Name
            <Field type="text" name="lastName" />
            <ErrorMessage name="lastName" component="div" />
          </label>

          <AuthButtons
            buttonText="Register"
            additionalText="Already have an account?"
            spanText="Login"
            redirectLink="/login"
          />
        </Form>
      </Formik>
    </>
  );
};

export default RegisterForm;