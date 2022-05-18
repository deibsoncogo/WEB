import { NextPage } from "next"


export default function Unauthorized() {
    return (
        <>
        
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">401</h1>
                <p className="fs-3"> <span className="text-danger">Opps! 😞</span> Página restrita.</p>
                <p className="lead">
                    Entre em contato com o administrador para mais informações.
                  </p>    

                  <a href = "/dashboard" className="btn btn-primary">Página Inicial</a>      
            </div>
    </div></>)
    
  }
