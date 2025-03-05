import { useParams } from 'react-router-dom';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthProvider';

const VisualizarCliente = () => {
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()
    const { id } = useParams()
    const [cliente, setCliente] = useState({})
    const [mensaje, setMensaje] = useState({})


    useEffect(() => {
        const consultarCliente = async () => {
            try {
                const token = localStorage.getItem('token')
                const url = `https://fin-carrera-ic.vercel.app/api/clientes/${id}`
                const options = {
                    headers: {
                        method: 'GET',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)
                setCliente(respuesta.data)
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultarCliente()
    }, [])

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Visualizar Cliente</h1>
                <hr className='my-4' />
                <p className='mb-8'>Este submódulo te permite visualizar los datos del cliente</p>
            </div>
            <div>
                {
                    Object.keys(cliente).length != 0 ?
                        (
                            <>
                                <div className='m-5 flex justify-between'>
                                    <div>
                                    <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* ID del cliente: </span>
                                            {cliente._id}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Nombre del cliente: </span>
                                            {cliente.nombre}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Apellido del cliente: </span>
                                            {cliente.apellido}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Cedula del cliente: </span>
                                            {cliente.cedula}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Fecha de nacimiento: </span>
                                            {cliente.fecha_nacimiento}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Ciudad: </span>
                                            {cliente.ciudad}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Direccion: </span>
                                            {cliente.direccion}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Telefono: </span>
                                            {cliente.telefono}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Email: </span>
                                            {cliente.email}
                                        </p>
                                    </div>
                                    <div>
                                        <img src="data:image/png;base64,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" alt="dogandcat" className='h-80 w-80' />
                                    </div>
                                </div>
                                <hr className='my-4' />
                                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                                <button className=" text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-700 px-4 py-1 rounded-lg" onClick={() => navigate(`/dashboard/`)}>Regresar</button>
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

export default VisualizarCliente