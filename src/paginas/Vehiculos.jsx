import React from 'react'
import TablaVehiculos from '../componets/TablaVehiculos'
import { useNavigate } from 'react-router-dom'

const Vehiculos = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Gestion de Vehiculos</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite gestionar vehiculos</p>
            <button className=" text-white mr-3 text-md block hover:bg-red-900 text-center bg-green-600 px-4 py-1 rounded-lg" onClick={() => navigate(`/dashboard/registrar_vehiculos/`)}>Registrar</button>
            <br />
            <TablaVehiculos/>
        </div>
    )
}

export default Vehiculos