// page é zero-index
export async function listPokemons(page, limit) {
  try {
    const offset = (page - 1) * limit;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);

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

export async function getAllPokemonNames() {
  try {
    const maxTry = 5; // não ir além disso
    let limit = 500;
    let offset = 0;
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    const list = [];

    let i = 0;
    while (i < maxTry && url !== null) {
      console.info(`getAllPokemonNames: ${i} ${url}`);

      const response = await fetch(url);
      const data = await response.json();

      for (let j = 0; j < data.results.length; j++) {
        list.push(data.results[j].name);
      }

      url = data.next;
      i++;
    }

    return list;
  } catch (error) {
    console.error(error);
  }
}