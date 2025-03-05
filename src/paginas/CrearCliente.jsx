import React from 'react'
import { FormularioCliente } from '../componets/FormularioCliente'
import { useNavigate } from 'react-router-dom'

const CrearCliente = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Gestion de Clientes</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este pagina te perimte registrar clientes</p>
            <FormularioCliente/>
            <br />
            <button className=" text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-700 px-4 py-1 rounded-lg" onClick={() => navigate(`/dashboard/`)}>Regresar</button>
        </div>
    )
}

export default CrearCliente