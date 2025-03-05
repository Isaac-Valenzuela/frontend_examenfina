import { useEffect, useState, useContext } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from 'axios';
import Mensaje from "./Alertas/Mensajes";
import { useNavigate } from 'react-router-dom'
import AuthContext from "../context/AuthProvider";

const TablaVehiculos = () => {
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()
    const [vehiculos, SetVehiculos] = useState([])

    const listarvehiculos = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `https://fin-carrera-ic.vercel.app/api/vehiculos`
            const options = {
                headers: {
                    method: 'GET',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            SetVehiculos(respuesta.data, ...vehiculos)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const confirmar = confirm("Vas a cambiar el estado de una vehiculos, ¿Estás seguro de realizar esta acción?")
            if (confirmar) {
                const token = localStorage.getItem('token')
                const url = `https://fin-carrera-ic.vercel.app/api/vehiculos/${id}`
                const headers = {
                    method: 'DELETE',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
                const data = {
                    salida: new Date().toString()
                }
                await axios.delete(url, { headers, data });
                listarvehiculos()
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarvehiculos()
    }, [])


    return (
        <>
            {
                vehiculos.length == 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen registros de vehiculos'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
                        <thead className='bg-blue-900 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Marca</th>
                                <th className='p-2'>Modelo</th>
                                <th className='p-2'>Año</th>
                                <th className='p-2'>Placa</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                vehiculos.map((vehiculo, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={vehiculo._id}>
                                        <td>{index + 1}</td>
                                        <td>{vehiculo.marca}</td>
                                        <td>{vehiculo.modelo}</td>
                                        <td>{vehiculo.anio_fabricacion}</td>
                                        <td>{vehiculo.placa}</td>
                                        <td className='py-2 text-center'>
                                            <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                                onClick={() => navigate(`/dashboard/visualizar_vehiculo/${vehiculo._id}`)}
                                            />

                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                                onClick={() => navigate(`/dashboard/actualizar_vehiculo/${vehiculo._id}`)}
                                            />

                                            <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                                                onClick={() => handleDelete(vehiculo._id)}
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

export default TablaVehiculos