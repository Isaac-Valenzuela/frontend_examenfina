import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensajes';
import axios from 'axios';
import { Formularioreservas } from '../componets/FormularioReserva';



const ActualizaReserva = () => {
    const { id } = useParams()
    const [reservas, setReservas] = useState({})
    const [mensaje, setMensaje] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const consultarReserva = async () => {
            try {
                const token = localStorage.getItem('token')
                const url = `https://fin-carrera-ic.vercel.app/api/reservas/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)
                setReservas(respuesta.data)
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultarReserva()
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar Reservas</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar los datos de una reserva registrada</p>
            {
                Object.keys(reservas).length != 0 ?
                    (
                        <Formularioreservas reservas={reservas}/>
                    )
                    :
                    (
                        Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )
            }
            <br />
            <button className=" text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-700 px-4 py-1 rounded-lg" onClick={() => navigate(`/dashboard/reservas`)}>Regresar</button>
        </div>

    )
}

export default ActualizaReserva