import axios from 'axios'
import alert from '~/src/util/alert'

//const BASE_URL = "http://localhost:8000"
const BASE_URL = "https://classroom-api.core42.id"

export function postLogin(data, fn) {
    return axios.post(BASE_URL + `/login`, data).then(fn)
        .catch((err) => {
            console.dir(err);
            alert("Error al ingresar DNI o password", 'warning');
            return Promise.reject(err);
        })
}

export function getSessions(sectionId, fn) {
    return axios.get(BASE_URL + `/session?seccion_id=${sectionId}`).then(fn)
        .catch((err) => {
            console.dir(err);
            alert("Error al traer clases", 'warning');
            return Promise.reject(err);
        })
}

export function postFiles(formData, fn) {
    return axios.post(BASE_URL + `/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(fn)
        .catch((err) => {
            console.dir(err);
            alert("Error al enviar archivos: " + err, 'warning');
            return Promise.reject(err);
        })
}
