import React, { useEffect, useState } from 'react'
import { sendData } from '../../helpers/postData';

const formsList = {
    car_model: [{ name: 'presentPrice', type: 'number', label: 'Precio presente', error: 'Debe ingresar un precio' }],
    mass_model: [{ name: 'Weight', type: 'number', label: 'Peso', error: 'Debe ingresar un peso' }],
    avocado_model: [{ name: '4046', type: 'number', label: 'Total de aguacates con PLU 4046 sold', error: 'Debe ingresar el total de aguacates con PLU 4046 sold' }, { name: '4225', type: 'number', label: 'Total de aguacates con PLU 4225 sold', error: 'Debe ingresar el total de aguacates con PLU 4225 sold' }, { name: '4770', type: 'number', label: 'Total de aguacates con PLU 4770 sold', error: 'Debe ingresar el total de aguacates con PLU 4770 sold' }],
    bitcoin_model: [{ name: 'open', type: 'number', label: 'Precio apertura', error: 'Debe ingresar un precio' }, { name: 'low', type: 'number', label: 'Precio mas bajo', error: 'Debe ingresar un precio' }, { name: 'high', type: 'number', label: 'Precio mas alto', error: 'Debe ingresar un precio' }],
    breast_cancer: [{ name: 'perimeter', type: 'number', label: 'Perimetro', error: 'Debe ingresar un perimetro' }, { name: 'area', type: 'number', label: 'Area', error: 'Debe ingresar el area' }, { name: 'radio', type: 'number', label: 'Radio', error: 'Debe ingresar el radio' }],
    rossman_sales_model: [{ name: 'customers', type: 'number', label: 'Cantidad de clientes', error: 'Debe ingresar una cantidad de clientes' }],
    horse_power_calculator: [{ name: 'yearSale', type: 'number', label: 'Año de reventa', error: 'Debe ingresar un año' }, { name: 'price', type: 'number', label: 'Precio en miles', error: 'Debe ingresar un precio' }, { name: 'eginie', type: 'number', label: 'Tamaño de la máquina', error: 'Debe ingresar un tamaño' }],
    salary_years_calculator: [{ name: 'years', type: 'number', label: 'Años de experiencia', error: 'Debe ingresar un año' }]
};

let resultado = [];

export const Predictions = ({ nameModel, searching }) => {

    const [result, setResult] = useState(null);
    const handleSubmit = async(e) => {
        e.preventDefault();        
        formsList[nameModel].forEach( (a,index) => {
            resultado.push(Number( e.target[index].value));
        });

        let data = await sendData(nameModel, resultado);
        setResult(data?.prediction);
        resultado = [];        
    };

    useEffect(() => {
        setResult(null);
    }, [nameModel]);
    

    return (
        <>
            <hr />
            <div className='container text-center'>
                <h3>
                    {searching}	
                </h3>
            </div>
            <div className='container'>
                <form onSubmit={handleSubmit}>

                    {
                        formsList[nameModel].map((form) => (
                            <div className='form-floating mb-3' key={form.name}>
                                <input 
                                    type={form.type} 
                                    className="form-control" 
                                    id={form.name} 
                                    placeholder={form.label} 
                                    name={form.name}/>
                                <label >{form.label}</label>
                            </div>
                        ))
                    }
                    <button type='submit' className='btn btn-primary'>
                        Realizar analisis
                    </button>

                    {
                        result && <label className='m-5'><strong>Resultado: </strong> {result} </label>
                    }

                </form>
            </div>
        </>
    )
}
