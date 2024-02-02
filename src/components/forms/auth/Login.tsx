import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useStore } from '../../../customHooks/auth';
import './styles.scss';
import AuthButtons from '../../buttons/auth';

interface LoginFormValues {
    email: string;
    password: string;
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

const LoginForm: React.FC = () => {
    const initialValues: LoginFormValues = { email: '', password: '' };
    const login = useStore(state => state.login);

    return (
        <>
            <h1>Login</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values: any, { setSubmitting }) => {
                    login(values)
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
                        Email
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                    </label>

                    <label>
                        Password
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                    </label>
                   
                    <AuthButtons
                        buttonText="Login"
                        additionalText="Don't have an account?"
                        spanText="Register"
                        redirectLink="/registration"
                    />
                </Form>

            </Formik>
        </>
    );
};

export default LoginForm;