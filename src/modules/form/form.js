import React from 'react';
import { useDispatch, useSelector} from "react-redux";
import './stylesCustom.css'
import './styles.css'
import { useEffect } from "react";
import { getRazas } from '../../store/actions/razaActions';
import { ToastContainer} from 'react-toastify';
import { load, notDate, notMonth, notName, notRace, notSex, notYear } from '../validations/formValidations';
import { Formik, Form} from 'formik';
import dateFormat from "dateformat";
import {MyTextInput, MyCheckbox, MyDate, MyNumber, MySelect} from '../components/formComponents';
import saveForm from "../controllers/formControllers"

export default function Register() {

    //CONST - USE EFFECT Y VARIABLES---------------------------------------------------------------
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRazas())
    }, []);

    const { razas } = useSelector(state => state);
    const arrayRazas = razas.map(e => e.name);
    const now = new Date();
    const hoy = dateFormat(now, "isoDate")

    //return del componente------------------------------------------------------------------------
    return (
        <>
            <h1>Registro</h1>
            <Formik
                initialValues={{
                    name: '',
                    race: '',
                    sex: '',
                    birthday: '',
                    year: '',
                    month: '',
                    exact: false
                }}
                onSubmit={(values, { setSubmitting }) => {
                    if(!values.name) notName();
                    else if(!values.race) notRace();
                    else if(!values.sex) notSex();
                    else if(!values.exact && !values.birthday) notDate();
                    else if(values.exact && !values.year) notYear();
                    else if(values.exact && !values.month) notMonth();
                    else{
                        saveForm(values, setSubmitting);
                        load();
                    }
                }}
            >
                {({values})=>(
                    <Form>
                    <MyTextInput
                        label="Nombre"
                        name="name"
                        type="text"
                        placeholder="Nombre de la mascota"
                    />

                    <MySelect label="Raza" name="race">
                        <option value="">Seleccionar raza</option>
                        {
                            razas && arrayRazas? arrayRazas.map( (e, index) =>{
                                return <option key={index} value={e}>{e}</option>
                            })
                            : "Loading"
                        }
                    </MySelect>

                    <MySelect label="Sexo" name="sex">
                        <option value="">Seleccionar sexo</option>
                        <option value="Macho">Macho</option>
                        <option value="Hembra">Hembra</option>
                    </MySelect>

                    <MyCheckbox name="exact">
                        Tildar si no sabe la fecha exacta de nacimiento
                    </MyCheckbox>
                    {
                        values.exact? 
                            <>
                                <label>Edad</label>
                                <MyNumber
                                    label="Años"
                                    name="year"
                                    type="number"
                                    min={0} 
                                />
                                <MyNumber
                                    label="Meses"
                                    name="month"
                                    type="number"
                                    min={0}
                                    max={11} 
                                />
                            </>
                            :
                            <MyDate
                                label="Fecha de nacimiento"
                                name="birthday"
                                type="date"
                                max={hoy} 
                            />
                    }
                    <button type="submit">Agregar</button>
                </Form>
                )}
            </Formik>
            
            <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            />
        </>
    );
};