import { useEffect, useState, useContext } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from "axios";
import Mensaje from "./Alertas/Mensajes";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const TablaReservas = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true); // Nuevo estado para indicar carga

    const listarReservas = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No se encontró un token.");
                return;
            }
            const url = `https://fin-carrera-ic.vercel.app/api/reservas`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            console.log("Datos recibidos:", respuesta.data); // Depuración
            setReservas(respuesta.data);
        } catch (error) {
            console.error("Error al obtener datos:", error);
        } finally {
            setCargando(false); // Finaliza la carga
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmar = confirm(
                "Vas a cambiar el estado de una reserva, ¿Estás seguro de realizar esta acción?"
            );
            if (confirmar) {
                const token = localStorage.getItem("token");
                const url = `https://fin-carrera-ic.vercel.app/api/reservas/${id}`;
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                };
                const data = { salida: new Date().toString() };
                await axios.delete(url, { headers, data });
                listarReservas();
            }
        } catch (error) {
            console.error("Error al eliminar reserva:", error);
        }
    };

    useEffect(() => {
        listarReservas();
    }, []);

    if (cargando) {
        return <Mensaje tipo={"active"}>{"Cargando..."}</Mensaje>;
    }

    return (
        <>
            {reservas.length === 0 ? (
                <Mensaje tipo={"active"}>{"No existen registros de reservas"}</Mensaje>
            ) : (
                <table className="w-full mt-5 table-auto shadow-lg bg-white">
                    <thead className="bg-blue-900 text-slate-400">
                        <tr>
                            <th className="p-2">N°</th>
                            <th className="p-2">Código</th>
                            <th className="p-2">Cliente</th>
                            <th className="p-2">Vehiculo</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map((reserva, index) => (
                            <tr className="border-b hover:bg-gray-300 text-center" key={reserva._id}>
                                <td>{index + 1}</td>
                                <td>{reserva.codigo}</td>
                                <td>{reserva.id_cliente ? `${reserva.id_cliente.nombre} ${reserva.id_cliente.apellido}` : "Sin asignar"}</td>
                                <td>{reserva.id_vehiculo?.marca || "Sin asignar"}</td>
                                <td className="py-2 text-center">
                                    <MdInfo
                                        className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                        onClick={() => navigate(`/dashboard/visualizar_reserva/${reserva._id}`)}
                                    />
                                    <MdNoteAdd
                                        className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                        onClick={() => navigate(`/dashboard/actualizar_reserva/${reserva._id}`)}
                                    />
                                    <MdDeleteForever
                                        className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                                        onClick={() => handleDelete(reserva._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default TablaReservas;
