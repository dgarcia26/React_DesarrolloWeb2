import React from 'react'

const PeticionApi = () => {
    const [personajes, setPersonajes] = React.useState([])
    const [paginacion, setPaginacion] = React.useState(1)

    const obtenerPersonajes = async () => {
        try {
          console.log('paginación: '+paginacion)
          const res = await fetch(`https://gateway.marvel.com/v1/public/characters?limit=5&offset=1&ts=1&apikey=c35c2fa460990e739d0dbdd3f44b8eda&hash=aa93429adafb6d018a1bf1e9be2c2b8f`);
          console.log(`https://rickandmortyapi.com/api/character/?page=${paginacion}`)
          const data = await res.json();
          const results = await data.data.results;
          setPersonajes(results)
        } catch (error) {
          console.log(error);
        }
      };

    const siguiente= async ()  => {
        await setPaginacion(paginacion+1);
        obtenerPersonajes();
    }
    const atras= async() => {
        await setPaginacion(paginacion-1)
        obtenerPersonajes();
    }
    
   

  return (
    <>
        <h1>PETICIÓN AL API DE MARVEL</h1>
        <button onClick={obtenerPersonajes}>Traer Personajes</button>
        <button onClick={siguiente}>Siguiente</button>
        <button onClick={atras}>Atrás</button>
        {
                personajes.map(({id, name, description, thumbnail})=> (
                    <div  class="container">
                    <div class="card" key = {id}>
                        <h4 key={id}>{id} - {name}</h4>
                        <div class="card-info">
                        <img class="imagen" src = {thumbnail.path+'.'+thumbnail.extension} alt = {name}/>
                        <span>{description}</span>
                        </div>
                    </div>
                    </div>
                ))
        }
    </>
  )
}

export default PeticionApi