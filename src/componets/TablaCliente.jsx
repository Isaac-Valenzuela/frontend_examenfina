import { useEffect, useState, useContext } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from 'axios';
import Mensaje from "./Alertas/Mensajes";
import { useNavigate } from 'react-router-dom'
import AuthContext from "../context/AuthProvider";

const TablaClientes = () => {
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()
    const [clientes, setClientes] = useState([])

    const listarCliente = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `https://fin-carrera-ic.vercel.app/api/clientes`
            const options = {
                headers: {
                    method: 'GET',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setClientes(respuesta.data, ...clientes)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const confirmar = confirm("Vas a cambiar el estado de un cliente, ¿Estás seguro de realizar esta acción?")
            if (confirmar) {
                const token = localStorage.getItem('token')
                const url = `https://fin-carrera-ic.vercel.app/api/clientes/${id}`
                const headers = {
                    method: 'DELETE',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
                const data = {
                    salida: new Date().toString()
                }
                await axios.delete(url, { headers, data });
                listarCliente()
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarCliente()
    }, [])


    return (
        <>
            {
                clientes.length == 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen registros de clientes'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
                        <thead className='bg-blue-900 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Apellido</th>
                                <th className='p-2'>Cedula</th>
                                <th className='p-2'>Telefono</th>
                                <th className='p-2'>Email</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clientes.map((cliente, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={cliente._id}>
                                        <td>{index + 1}</td>
                                        <td>{cliente.nombre}</td>
                                        <td>{cliente.apellido}</td>
                                        <td>{cliente.cedula}</td>
                                        <td>{cliente.telefono}</td>
                                        <td>{cliente.email}</td>
                                        <td className='py-2 text-center'>
                                            <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                                onClick={() => navigate(`/dashboard/visualizar_cliente/${cliente._id}`)}
                                            />

                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={() => navigate(`/dashboard/actualizar_cliente/${cliente._id}`)} />

                                            <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                                                onClick={() => { handleDelete(cliente._id) }}
                                            />


                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
            }
        </>
    )
}

export default TablaClientes