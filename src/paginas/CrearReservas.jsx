import React from 'react'
import { Formularioreservas } from '../componets/FormularioReserva'
import { useNavigate } from 'react-router-dom'

const CrearReservas = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Gestion de Reservas</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te perimte registrar reservas</p>
            <Formularioreservas/>
            <br />
            <button className=" text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-700 px-4 py-1 rounded-lg" onClick={() => navigate(`/dashboard/reservas`)}>Regresar</button>
        </div>
    )
}

export default CrearReservas