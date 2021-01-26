import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';


function App() {
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: '',
  });

  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});

  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const appId = '1373bf66b5ea0cc583b5917fe05b85c2';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado);
        setConsultar(false);
      }
    };

    consultarAPI();
  }, [consultar]);

  return (
    <Fragment>
      <Header titulo='Climapp React' />

      <div className='contenedor-form'>
        <div className='container'>
          <div className='row'>
            <div className='col m6 s12'>
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className='col m6 s12'>
              <Clima resultado={resultado}/>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
