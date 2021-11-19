import React, { useState } from 'react';
import { useDispatch, useSelector} from "react-redux";
import './stylesCustom.css'
import './styles.css'
import { useEffect } from "react";
import { getRazas } from '../../store/actions/razaActions';
import { ToastContainer, toast } from 'react-toastify';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import dateFormat from "dateformat";

export default function Register(props) {

    //NOTIFICACIONES------------------------------------------------------------------------------
    const load = () => toast.success('AGREGADO CON EXITO!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    //CONST - USE EFFECT Y VARIABLES---------------------------------------------------------------
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRazas())
    }, []);

    const { razas } = useSelector(state => state);
    const arrayRazas = razas.map(e => e.name);
    const now = new Date();
    const hoy = dateFormat(now, "isoDate")
    const [check, setCheck] = useState(false);
    console.log('CHECKPRIN', check)

    const MyTextInput = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
            <>
                <label htmlFor={props.id || props.name}>{label}</label>
                <input className="text-input" {...field} {...props} />
                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
            </>
        );
    };

    const MyCheckbox = ({ children, ...props }) => {
        const [field] = useField({ ...props, type: 'checkbox' });
        field.name === 'exacta' && setCheck(field.value);
        return (
            <div>
                <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
                {children}
                </label>
            </div>
        );
    };

    const MySelect = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
            <div>
                <label htmlFor={props.id || props.name}>{label}</label>
                <select {...field} {...props} />
                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
            </div>
        );
    };

    const MyDate = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
            <div>
                <label htmlFor={props.id || props.name}>{label}</label>
                <input {...field} {...props} />
                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
            </div>
        );
    };

    const MyNumber = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
            <div>
                <label htmlFor={props.id || props.name}>{label}</label>
                <input {...field} {...props} />
                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
            </div>
        );
    };

    //return del componente------------------------------------------------------------------------
    return (
        <>
            <h1>Registro</h1>
            <Formik
                initialValues={{
                    nombre: '',
                    raza: '',
                    sexo: '',
                    fechaDeNacimiento: '',
                    year: '',
                    month: '',
                    exacta: false,
                }}
                validationSchema={Yup.object({
                    nombre: Yup.string()
                        .min(2, 'El nombre debe contener 2 caracteres minimamente')
                        .required('Falta insertar un nombre'),
                    raza: Yup.string()
                        .required('Falta seleccionar una opción'),
                    fechaDeNacimiento: Yup.date()
                        .required('Falta seleccionar una fecha'),
                    year: Yup.number()
                        .required('Falta completar este campo'),
                    month: Yup.number()
                        .required('Falta completar este campo'),
                    sexo: Yup.string()
                        .required('Falta seleccionar una opción'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                <Form>
                    <MyTextInput
                        label="Nombre"
                        name="nombre"
                        type="text"
                        placeholder="Nombre de la mascota"
                    />

                    <MySelect label="Raza" name="raza">
                        <option value="">Seleccionar raza</option>
                        {
                            razas && arrayRazas? arrayRazas.map( e =>{
                                return <option value={e}>{e}</option>
                            })
                            : "Loading"
                        }
                    </MySelect>

                    <MySelect label="Sexo" name="sexo">
                        <option value="">Seleccionar sexo</option>
                        <option value="macho">Macho</option>
                        <option value="hembra">Hembra</option>
                    </MySelect>

                    <MyCheckbox name="exacta">
                        Tildar si no sabe la fecha exacta de nacimiento
                    </MyCheckbox>
                    {
                        check? 
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
                                />
                            </>
                            :
                            <MyDate
                                label="Fecha de nacimiento"
                                name="fechaDeNacimiento"
                                type="date"
                                max={hoy} 
                            />
                    }

                    
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </>
    );
};