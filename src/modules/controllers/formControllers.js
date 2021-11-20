import axios from "axios";
import dateFormat from "dateformat";

export default async function saveForm(values, setSubmitting){

    const now = new Date();
    const today = dateFormat(now, "isoDate");
    let year = parseInt(today.slice(0,4)) - values.year;
    let month = parseInt(today.slice(5,7)) 
    if(month <= values.month){
        month = 12 - values.month + month;
        year--;
    }else{
        month = month - values.month;
    };
    if(month < 10) month = `0${month}`;
    if(values.exact){
        values = {
            ...values,
            birthday: `${year}-${month}-15`
        }
    }
    const {data} = await axios.post('http://localhost:1337/dogs', values);
    setSubmitting(false);
}