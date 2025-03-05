import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Mensaje from "./Alertas/Mensajes";


export const FormularioVehiculo = ({ vehiculos }) => {

    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState({})
    const [form, setform] = useState({
        marca: vehiculos?.marca ?? "",
        modelo: vehiculos?.modelo ?? "",
        anio_fabricacion: vehiculos?.anio_fabricacion ?? "",
        placa: vehiculos?.placa ?? "",
        color: vehiculos?.color ?? "",
        tipo_vehiculo: vehiculos?.tipo_vehiculo ?? "",
        kilometraje: vehiculos?.kilometraje ?? "",
        descripcion: vehiculos?.descripcion ?? "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setform({
            ...form,
            [name]: name === "kilometraje" ? (value === "" ? "" : Number(value)) : value
        });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (vehiculos?._id) {
            const token = localStorage.getItem('token')
            const url = `https://fin-carrera-ic.vercel.app/api/vehiculos/${vehiculos?._id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.put(url, form, options)
            navigate('/dashboard/vehiculos')
        }
        else{
            try {
                const token = localStorage.getItem('token')
                const url = `https://fin-carrera-ic.vercel.app/api/vehiculos`
                const options = {
                    headers: {
                        method: 'POST',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.post(url, form, options)
                setMensaje({ respuesta: "vehiculo registrado con exito", tipo: true })
                setTimeout(() => {
                    navigate('/dashboard/vehiculos');
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
                    htmlFor='marca:'
                    className='text-gray-700 uppercase font-bold text-sm'>Marca del vehiculo: </label>
                <input
                    id='marca'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='marca del vehiculo'
                    value={form.marca}
                    name='marca'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='modelo:'
                    className='text-gray-700 uppercase font-bold text-sm'>Modelo del vehiculo: </label>
                <input
                    id='modelo'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='modelo del vehiculo'
                    value={form.modelo}
                    name='modelo'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='anio_fabricacion:'
                    className='text-gray-700 uppercase font-bold text-sm'>Año de fabricacion: </label>
                <input
                    id='anio_fabricacion'
                    type="date"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='año de fabricacion'
                    value={form.anio_fabricacion}
                    name='anio_fabricacion'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='placa:'
                    className='text-gray-700 uppercase font-bold text-sm'>Placa del vehiculo: </label>
                <input
                    id='placa'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='placa del vehiculo'
                    value={form.placa}
                    name='placa'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='color:'
                    className='text-gray-700 uppercase font-bold text-sm'>Color del vehiculo: </label>
                <input
                    id='color'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='color del vehiculo'
                    value={form.color}
                    name='color'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='tipo_vehiculo:'
                    className='text-gray-700 uppercase font-bold text-sm'>Tipo de vehiculo: </label>
                <input
                    id='tipo_vehiculo'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='tipo de vehiculo'
                    value={form.tipo_vehiculo}
                    name='tipo_vehiculo'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='kilometraje:'
                    className='text-gray-700 uppercase font-bold text-sm'>Kilometraje: </label>
                <input
                    id='kilometraje'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='kilometraje del vehiculo'
                    value={form.kilometraje}
                    name='kilometraje'
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
                    placeholder='descripcion de la materia'
                    value={form.descripcion}
                    name='descripcion'
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                className='bg-green-800 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'
                    value={vehiculos?._id ? 'Actualizar vehiculo' : 'Registrar vehiculo'} />

        </form>

    )
}