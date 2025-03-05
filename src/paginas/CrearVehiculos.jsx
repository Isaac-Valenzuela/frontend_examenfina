import React from 'react'
import { FormularioVehiculo } from '../componets/FormularioVehiculo'
import { useNavigate } from 'react-router-dom'

const CrearVehiculos = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Gestion de Vehiculos</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te perimte registrar vehiculos</p>
            <FormularioVehiculo/>
            <br />
            <button className=" text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-700 px-4 py-1 rounded-lg" onClick={() => navigate(`/dashboard/vehiculos`)}>Regresar</button>
        </div>
    )
}

export default CrearVehiculos