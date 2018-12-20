import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
});

export const ValidationSchemaExample = () => (
    <article className="fc w-100 br3 dark-gray bg-light-gray b--black-10 shadow-3 center">
        <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0 tc">Sign In</legend>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                    }}
                        validationSchema={SignupSchema}
                        onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                    }}
                >
            {({ errors, touched }) => (
                <Form>
                    <Field name="firstName" className="db fw6 lh-copy f6"/>
                    {errors.firstName && touched.firstName ? (
                        <div>{errors.firstName}</div>
                    ) : null}
                    <Field name="lastName" className="db fw6 lh-copy f6" />
                    {errors.lastName && touched.lastName ? (
                        <div>{errors.lastName}</div>
                    ) : null}
                    <Field name="email" type="email" className="db fw6 lh-copy f6" />
                    {errors.email && touched.email ? 
                    <div>{errors.email}</div> : null}
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
        </fieldset>
        </div>
        </main>
    </article>
);

export default ValidationSchemaExample;