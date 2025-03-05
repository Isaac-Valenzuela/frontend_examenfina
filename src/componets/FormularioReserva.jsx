import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Mensaje from "./Alertas/Mensajes";


export const Formularioreservas = ({ reservas }) => {

    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState({})
    const [form, setform] = useState({
        codigo: reservas?.codigo ?? "",
        descripcion: reservas?.descripcion ?? "",
        id_cliente: reservas?.id_cliente?._id ?? "",  // Aquí se extrae solo el _id
        id_vehiculo: reservas?.id_vehiculo?._id ?? "",  // Aquí se extrae solo el _id
    })

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (reservas?._id) {
            const token = localStorage.getItem('token')
            const url = `https://fin-carrera-ic.vercel.app/api/reservass/${reservas?._id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.put(url, form, options)
            navigate('/dashboard/reservas')
        }
        else {
            try {
                const token = localStorage.getItem('token')
                const url = `https://fin-carrera-ic.vercel.app/api/reservas`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.post(url, form, options)
                setMensaje({ respuesta: "reservas registrada con exito", tipo: true })
                setTimeout(() => {
                    navigate('/dashboard/reservas');
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
                    htmlFor='codigo:'
                    className='text-gray-700 uppercase font-bold text-sm'>Codigo de la reservas: </label>
                <input
                    id='codigo'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='codigo de la reservas'
                    value={form.codigo}
                    name='codigo'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='descripcion:'
                    className='text-gray-700 uppercase font-bold text-sm'>Descripcion: </label>
                <input
                    id='descripcion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='descripcion de la reservas'
                    value={form.descripcion}
                    name='descripcion'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='id_cliente:'
                    className='text-gray-700 uppercase font-bold text-sm'>ID del Cliente: </label>
                <input
                    id='id_cliente'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='ID del cliente'
                    value={form.id_cliente}
                    name='id_cliente'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='id_vehiculo:'
                    className='text-gray-700 uppercase font-bold text-sm'>ID del vehiculo: </label>
                <input
                    id='id_vehiculo'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='ID del reservas'
                    value={form.id_vehiculo}
                    name='id_vehiculo'
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                className='bg-green-800 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'
                value={reservas?._id ? 'Actualizar reservas' : 'Registrar reservas'} />

        </form>

    )
}