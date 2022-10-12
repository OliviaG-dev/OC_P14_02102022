import './Home.css'
import { useState } from 'react';
import dataStates from '../../data/dataStates';
import dataDepartements from '../../data/dataDepartements';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { createEmployee } from '../../redux/features/employee';
import { useDispatch } from 'react-redux';



const Home = () => {
    const [isShow, setIsShow] = useState(false)
    const dispatch = useDispatch();

    
    const closeModal = () =>{
        setIsShow(!isShow)
    }
    
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(4, 'Too small')
            .max(15, 'Too long')
            .required('This field is required'),
        lastName: Yup.string()
            .min(4, 'Too small')
            .max(15, 'Too long')
            .required('This field is required'),
        dateOfBirth: Yup.date()
            .required('This field is required'),
        startDate: Yup.date()
            .required('This field is required'),
        street: Yup.string()
            .min(4, 'Too small')
            .max(25, 'Too long')
            .required('This field is required'),
        city: Yup.string()
            .min(3, 'Too small')
            .max(10, 'Too long')
            .required('This field is required'),
        state: Yup.string()
            .required('This field is required'),
        zipCode: Yup.string()
            // .test('len', 'Must be exactly 5 characters', val => val.toString().length === 5)
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(5, 'Must be exactly 5 digits')
            .max(5, 'Must be exactly 5 digits')
            .required('This field is required'),
        departement: Yup.string()
            .required('This field is required'),
    })
    
    const initialValues = {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        startDate: "",
        street: "",
        city: "",
        state: "Select a state...",
        zipCode: "",
        departement: "Select a departement...",
    }


    return (
    <main className='home'>
        <h2 className='home__text'>Create employee</h2>
        <div className='home__container'>
            <Formik initialValues={initialValues}
                    validationSchema={validationSchema} 
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                    console.log(values)
                    dispatch(createEmployee(values))
                    setSubmitting(false)
                    resetForm({
                        firstName:"",
                        lastName:"",
                        birth:"",
                        startDate:"",
                        street:"",
                        city:"",
                        state:"",
                        zipCode:"",
                        departement:"",
                    })
                    setIsShow(true)
                    }}
                    >
                <Form className='home__form'>

                    <div  className='form__div'>
                        <label htmlFor='firstName'>First Name</label>
                        <Field name='firstName' type='text' />
                        <ErrorMessage name='firstName' component='span' className='form__error' />
                    </div>

                    <div  className='form__div'>
                        <label htmlFor='lastName'>Last Name</label>
                        <Field name='lastName' type='text' />
                        <ErrorMessage name='lastName' component='span' className='form__error' />
                    </div>

                    <div  className='form__div'>
                        <label htmlFor='dateOfBirth'>Date of Birth</label>
                        <Field name='dateOfBirth' type='date' />
                        <ErrorMessage name='dateOfBirth' component='span' className='form__error' />
                    </div>

                    <div  className='form__div'>
                        <label htmlFor='startDate'>Start Date</label>
                        <Field name='startDate' type='date' />
                        <ErrorMessage name='startDate' component='span' className='form__error' />
                    </div>
                    
                    <fieldset className='form__address'>
                        <legend>Address:</legend>

                        <div  className='form__div'>
                            <label htmlFor='street'>Street</label>
                            <Field name='street' type='text' />
                            <ErrorMessage name='street' component='span' className='form__error' />
                        </div>

                        <div  className='form__div'>
                            <label htmlFor='city'>City</label>
                            <Field name='city' type='text' />
                            <ErrorMessage name='city' component='span' className='form__error' />
                        </div>

                        <div  className='form__div'>
                            <label htmlFor='state'>State</label>
                            <Field name='state' as='select' className='from__select'>                              
                                {dataStates.map((option, index) => (
                                    <option value={option.abbreviation} key={index}>{option.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name='state' component='span' className='form__error' />
                        </div>

                        <div  className='form__div'>
                            <label htmlFor='zipCode'>Zip Code</label>
                            <Field name='zipCode' type='number' />
                            <ErrorMessage name='zipCode' component='span' className='form__error' />
                        </div>

                    </fieldset>

                    <div  className='form__div'>
                        <label htmlFor='departement'>Departement</label>
                        <Field name='departement' as='select' className='from__select'>
                            {dataDepartements.map((option) => (
                                <option value={option.value} key={option.id}>{option.label}</option>
                            ))}
                        </Field>
                        <ErrorMessage name='departement' component='span' className='form__error' />
                    </div>

                    <button type='submit' className='from__button'>Save</button>

                </Form>
            </Formik>

        </div>
    </main>
)};


export default Home