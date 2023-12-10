import { handleGetData } from "../assets/questionnaireFunctions"
import { useEffect } from "react"
export const GraficaScreen =()=>{
    useEffect(()=>{
        getData();
    })
    const getData=async()=>{
        const datos = await handleGetData();
        console.log(datos)
    }
    return(
        <>
        
        </>
    )
}