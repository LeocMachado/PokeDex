const pokemonName = document.querySelector(".pokemon_name");
const PokemonNumber = document.querySelector(".pokemon_number");
const PokemonIMG = document.querySelector(".pokemon_img");
const form = document.querySelector(".form");
const input = document.querySelector(".input_search");

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemons = async (pokemon) => {
  const APIresp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIresp.status == 200) {
    const data = await APIresp.json();
    return data;
  }
};

const RenderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Carregando...";
  PokemonNumber.innerHTML = "";

  const data = await fetchPokemons(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    PokemonNumber.innerHTML = data.id;
    PokemonIMG.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    searchPokemon = data.id;
  } else {
    PokemonIMG.style.display = "none";
    pokemonName.innerHTML = "Não encontrado :c";
    PokemonNumber.innerHTML = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  RenderPokemon(input.value.toLowerCase());
  input.value = "";
});

btnPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    RenderPokemon(searchPokemon);
  }
});

btnNext.addEventListener("click", () => {
  searchPokemon += 1;
  RenderPokemon(searchPokemon);
});

RenderPokemon(searchPokemon);
