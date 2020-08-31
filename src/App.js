import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import InfoArtista from './components/InfoArtista';
import axios from 'axios';

function App() {

  //STATES
  const [busquedaletra, setBusquedaLetra] = useState({})
  const [letra, setLetra] = useState('');
  const [infoartista, setInfoArtista] = useState({});

  //USE EFFECT
  useEffect(() => {
    if (Object.keys(busquedaletra).length === 0) return;

    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaletra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      //con este promise ambas consultas inician en el mismo tiempo, cada una termina cuando cargue todos sus datos.
      const [letra, informacion] = await Promise.all([
        axios(url),
        axios(url2)
      ]);
      /* console.log(letra.data.lyrics);
      console.log(informacion.data.artist[0]); */

      setLetra(letra.data.lyrics);
      setInfoArtista(informacion.data.artists[0], infoartista);
    }
    consultarApiLetra();

  }, [busquedaletra])

  return (
    <>
      <Formulario
        setBusquedaLetra={setBusquedaLetra}
      />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <InfoArtista
              infoartista={infoartista}
            />
          </div>
          <div className="col-md-6">
            <Cancion
              letra={letra}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
