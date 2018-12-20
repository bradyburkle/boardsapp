import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
});

export const SignIn = (props) => (
    <article className="fc w-25 br3 dark-gray bg-light-gray b--black-10 shadow-3 center">
        <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0 tc">Sign In</legend>
                        <div className="mt3">

                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={values => {
                            // same shape as initial values
                            console.log(values);

                            fetch('http://localhost:3001/signin', {
                                method: 'post',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    email: values.email,
                                    password: values.password
                                })
                            })
                                .then(response => response.json())
                                .then(user => {
                                    if (user.id) {
                                        console.log(user);
                                        props.loadUser(user);
                                        props.onRouteChange('home');
                                    }
                                })
                                .catch(err => console.log(err))




                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>

                                <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>         
                                <Field name="email" type="email" className="db fw6 lh-copy f6 mb3" />

                                {errors.email && touched.email ?
                                <div className="db fw6 lh-copy f7 mb3">{errors.email}</div> : null}

                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <Field name="password" className="db fw6 lh-copy f6 mb3" type="password" />

                                {errors.password && touched.password ? (
                                    <div className="db fw6 lh-copy f7">{errors.password}</div>
                                ) : null}


                                <button type="submit">Submit</button>
                            </Form>
                        )}
                    </Formik>
                    </div>
                </fieldset>
            </div>
        </main>
    </article>
);

export default SignIn;