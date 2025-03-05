import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Mensaje from "./Alertas/Mensajes";


export const FormularioCliente = ({ clientes }) => {

    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState({})
    const [form, setform] = useState({
        nombre: clientes?.nombre ?? "",
        apellido: clientes?.apellido ?? "",
        cedula: clientes?.cedula ?? "",
        fecha_nacimiento: new Date(clientes?.fecha_nacimiento).toLocaleDateString('en-CA', { timeZone: 'UTC' }) ?? "",
        ciudad: clientes?.ciudad ?? "",
        direccion: clientes?.direccion ?? "",
        telefono: clientes?.telefono ?? "",
        email: clientes?.email ?? "",
    })

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (clientes?._id) {
            const token = localStorage.getItem('token')
            const url = `https://fin-carrera-ic.vercel.app/api/clientes/${clientes?._id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.put(url, form, options)
            navigate('/dashboard')
        }
        else{
            try {
                const token = localStorage.getItem('token')
                const url = `https://fin-carrera-ic.vercel.app/api/clientes`
                const options = {
                    headers: {
                        method: 'POST',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.post(url, form, options)
                setMensaje({ respuesta: "cliente registrado con exito", tipo: true })
                setTimeout(() => {
                    navigate('/dashboard');
                }, 3000);
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
                setTimeout(() => {
                    setMensaje({})
                }, 3000);
            }
        }
    }



    return (
        <form onSubmit={handleSubmit}>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label
                    htmlFor='nombre:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del cliente: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre del cliente'
                    value={form.nombre}
                    name='nombre'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='apellido:'
                    className='text-gray-700 uppercase font-bold text-sm'>Apellido del cliente: </label>
                <input
                    id='apellido'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='apellido del cliente'
                    value={form.apellido}
                    name='apellido'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='cedula:'
                    className='text-gray-700 uppercase font-bold text-sm'>Cedula: </label>
                <input
                    id='cedula'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='cedula del cliente'
                    value={form.cedula}
                    name='cedula'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='fecha_nacimiento:'
                    className='text-gray-700 uppercase font-bold text-sm'>Fecha de Nacimiento: </label>
                <input
                    id='fecha_nacimiento'
                    type="date"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='fecha nacimiento'
                    name='fecha_nacimiento'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='ciudad:'
                    className='text-gray-700 uppercase font-bold text-sm'>Ciudad del cliente: </label>
                <input
                    id='ciudad'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='ciudad del cliente'
                    value={form.ciudad}
                    name='ciudad'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='direccion:'
                    className='text-gray-700 uppercase font-bold text-sm'>Direccion del cliente: </label>
                <input
                    id='direccion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='direccion del cliente'
                    value={form.direccion}
                    name='direccion'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='telefono:'
                    className='text-gray-700 uppercase font-bold text-sm'>Telefono: </label>
                <input
                    id='telefono'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='telefono del cliente'
                    value={form.telefono}
                    name='telefono'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='email:'
                    className='text-gray-700 uppercase font-bold text-sm'>Email: </label>
                <input
                    id='email'
                    type="email"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='email del cliente'
                    value={form.email}
                    name='email'
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                className='bg-green-800 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'
                    value={clientes?._id ? 'Actualizar cliente' : 'Registrar cliente'} />

        </form>

    )
}