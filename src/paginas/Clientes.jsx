import React from 'react'
import AuthContext from '../context/AuthProvider'
import { useContext } from 'react'
import TablaClientes from '../componets/TablaCliente'
import { useNavigate } from 'react-router-dom'

const Clientes = () => {
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()
    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Gestion de Clientes</h1>
                <hr className='my-4' />
                <p className='mb-8'>Este módulo te permite gestionar clientes</p>
                <button className=" text-white mr-3 text-md block hover:bg-red-900 text-center bg-green-600 px-4 py-1 rounded-lg" onClick={() => navigate(`/dashboard/registrar_cliente/`)}>Registrar</button>
                <br />
                <TablaClientes/>
                <br></br>
        
            </div>
        </>

    )
}

export default Clientes