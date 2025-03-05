import { useParams } from 'react-router-dom';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthProvider';

const VisualizarVehiculo = () => {
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()
    const { id } = useParams()
    const [vehiculos, setVehiculo] = useState({})
    const [mensaje, setMensaje] = useState({})


    useEffect(() => {
        const consultarVehiculo = async () => {
            try {
                const token = localStorage.getItem('token')
                const url = `https://fin-carrera-ic.vercel.app/api/vehiculos/${id}`
                const options = {
                    headers: {
                        method: 'GET',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)
                setVehiculo(respuesta.data)
                console.log(respuesta)
            } catch (error) {
                setVehiculo({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultarVehiculo()
    }, [])

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Visualizar Vehiculo</h1>
                <hr className='my-4' />
                <p className='mb-8'>Este submódulo te permite visualizar los datos de un vehiculo</p>
            </div>
            <div>
                {
                    Object.keys(vehiculos).length != 0 ?
                        (
                            <>
                                <div className='m-5 flex justify-between'>
                                    <div>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* ID del vehiculo: </span>
                                            {vehiculos._id}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Modelo del vehiculo: </span>
                                            {vehiculos.marca}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Marca del vehiculo: </span>
                                            {vehiculos.modelo}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Año de fabricacion: </span>
                                            {vehiculos.anio_fabricacion}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Placa: </span>
                                            {vehiculos.placa}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Color: </span>
                                            {vehiculos.color}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Tipo: </span>
                                            {vehiculos.tipo_vehiculo}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Kilometraje: </span>
                                            {vehiculos.kilometraje}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Año de fabricacion: </span>
                                            {vehiculos.descripcion}
                                        </p>
                                    </div>
                                    <div>
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Z4-MqmGIPJgbDm4G3a6b0SmYpjfyvFAbCQ&s" alt="dogandcat" className='h-80 w-80' />
                                    </div>
                                </div>
                                <hr className='my-4' />
                                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                                <button className=" text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-700 px-4 py-1 rounded-lg" onClick={() => navigate(`/dashboard/vehiculos`)}>Regresar</button>
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

export default VisualizarVehiculo