import React, {useState, useEffect} from 'react';
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "../styles.css"

function UserForm ({errors, touched, values, status}) {

    const [users, setUsers] = useState([]);
    console.log("Users: ", users);

    useEffect(() => {
        if (status){
            console.log("useEffect: Users: ", users);
            setUsers([...users, status]);
            console.log("useEffect: Users after: ", users);
        }
    }, [status]);

    return(
        <div className="user-form">
            <Form>
                <Field 
                    component="input"
                    type="text"
                    name="name"
                    placeholder="Name"              
                />
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}
                <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                />
                 {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}
                <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                 {/* {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )} */}
                <label className="checkbox-container">
                    Terms of Service
                    <Field
                        type="checkbox"
                        name="terms"
                        checked={values.terms}
                    />
                    <span className="checkmark" />
                 </label>
                 <button>Submit</button>
            </Form>
            {users.map(user => (
                <p key={user.id}>{user.name}</p>
            ))}
        </div>
        
    )
};

const formikHOC = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
          name: name || "",
          email: email || "",
          password: password || "",
          terms: terms || false
        };
      },
      validationSchema: Yup.object().shape({
        name: Yup.string().required("Name required"),
        email: Yup.string().email("Invalid email").required("Email required"),
        password: Yup.string().required("Password required"),
      }),
      /*the configuration object above (inside withFormik) will look for 
        a handleSubmit function and pass values
      */
      handleSubmit(values, {setStatus, resetForm}){
          axios
          .post('https://reqres.in/api/users', values)
          .then(res => {
                console.log("handleSubmit: then: res: ", res);
                setStatus(res.data);
                resetForm()
            })
          .catch(err => console.log("handleSubmit: catch: err: ", err))
      }
});

const UserFormWithFormik = formikHOC(UserForm)

export default UserFormWithFormik;