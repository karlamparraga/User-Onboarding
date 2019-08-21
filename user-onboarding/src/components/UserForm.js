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
            </Form>
        </div>
        
    )
}

const formikHOC = withFormik({});
const UserFormWithFormik = formikHOC(UserForm)

export default UserFormWithFormik;