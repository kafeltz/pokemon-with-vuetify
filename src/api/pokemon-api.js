// page é zero-index
export async function listPokemons(page, limit) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${limit * (page - 1)}`);

    const list = await response.json();

    return list;
  } catch (error) {
    console.error(error);
  }
}


export async function getPokemonInfo(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const data = await response.json();

    const info = {
      number: data.id,
      name: data.name,
      male: data.sprites.front_default,
      female: data.sprites.front_female,
      type: data.types[0].type.name,
    }

    return info;
  } catch (error) {
    console.error(error);
  }
}