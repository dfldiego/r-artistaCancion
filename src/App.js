import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import axios from 'axios';

function App() {

  //STATES
  const [busquedaletra, setBusquedaLetra] = useState({})
  const [letra, setLetra] = useState('');

  //USE EFFECT
  useEffect(() => {
    if (Object.keys(busquedaletra).length === 0) return;

    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaletra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const resultado = await axios(url);
      //console.log(resultado.data.lyrics);
      setLetra(resultado.data.lyrics);
    }
    consultarApiLetra();

  }, [busquedaletra])

  return (
    <>
      <Formulario
        setBusquedaLetra={setBusquedaLetra}
      />
    </>
  );
}

export default App;
