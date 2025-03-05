import { useParams } from 'react-router-dom';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthProvider';

const VisualizarReserva = () => {
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()
    const { id } = useParams()
    const [reservas, setReservas] = useState({})
    const [mensaje, setMensaje] = useState({})


    useEffect(() => {
        const consultarMatricula = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `https://fin-carrera-ic.vercel.app/api/reservas/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const respuesta = await axios.get(url, options);
                console.log("Respuesta API:", respuesta.data); // ✅ Verifica qué datos llegan
                if (respuesta.data) {
                    setReservas(respuesta.data);
                } else {
                    setReservas({}); // ✅ Evita que sea undefined
                }
            } catch (error) {
                console.error("Error en la API:", error);
                setMensaje({ respuesta: error.response?.data?.msg || "Error desconocido", tipo: false });
            }
        };
        consultarMatricula();
    }, []);
    

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Visualizar Reserva</h1>
                <hr className='my-4' />
                <p className='mb-8'>Este submódulo te permite visualizar los datos de una reserva</p>
            </div>
            <div>
                {
                     reservas && Object.keys(reservas).length > 0 ?
                        (
                            <>
                                <div className='m-5 flex justify-between'>
                                    <div>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* ID de la reserva: </span>
                                            {reservas._id}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Codigo de la reserva: </span>
                                            {reservas.codigo}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Descripcion: </span>
                                            {reservas.descripcion}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* ID del cliente: </span>
                                            {reservas.id_cliente?._id}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Nombre del cliente: </span>
                                            {`${reservas.id_cliente?.nombre} ${reservas.id_cliente?.apellido}`}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* ID del vehiculo: </span>
                                            {reservas.id_vehiculo?._id}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Marca del vehiculo: </span>
                                            {reservas.id_vehiculo?.marca}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Modelo del vehiculo: </span>
                                            {reservas.id_vehiculo?.modelo}
                                        </p>
                                    </div>
                                    <div>
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT4Cbws8cwt5ywHoavV8BREB5TxVej4eUYsQ&s" alt="dogandcat" className='h-80 w-80' />
                                    </div>
                                </div>
                                <hr className='my-4' />
                                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                                <button className=" text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-700 px-4 py-1 rounded-lg" onClick={() => navigate(`/dashboard/reservas`)}>Regresar</button>
                            </>

                        )
                        :
                        (
                            Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                        )
                }
            </div>
        </>

    )
}

export default VisualizarReserva