import React, {useState, useEffect} from 'react';
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "../styles.css"

function UserForm() {
    return(
        <div className="user-form">
            <Form>
                <Field 
                    component="input"
                    type="text"
                    name="name"
                    placeholder="Name"
                />
                <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                />
                <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                <label className="checkbox-container">
                    Terms of Servive
                    <Field
                        type="checkbox"
                        name="terms"
                        checked="false"
                    />
                    <span className="checkmark" />
                 </label>
            </Form>
            

            <button>Submit</button>
        </div>
        
    )
}

const formikHOC = withFormik({});
const UserFormWithFormik = formikHOC(UserForm)

export default UserFormWithFormik;