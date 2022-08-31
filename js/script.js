const pokemon__name = document.querySelector('.pokemon__name')
const pokemon__number = document.querySelector('.pokemon__number')
const pokemon__image = document.querySelector('.pokemon__image')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const buttomPrev = document.querySelector('.btn-prev')
const buttomNext = document.querySelector('.btn-next')

let searchPokemon = 1

const fetchPokemon = async pokemon => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )

  if (APIResponse.status === 200) {
    const data = await APIResponse.json()
    return data
  }
}

const renderPokemon = async pokemon => {
  pokemon__name.innerHTML = 'Loading...'
  pokemon__number.innerHTML = ''
  const data = await fetchPokemon(pokemon)
  if (data) {
    pokemon__image.style.display = 'block'
    pokemon__name.innerHTML = data.name
    pokemon__number.innerHTML = data.id
    pokemon__image.src =
      data['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ]
    searchPokemon = data.id
  } else {
    pokemon__image.style.display = 'none'
    pokemon__name.innerHTML = 'Not found '
    pokemon__number.innerHTML = ''
  }
  input.value = ''
}

form.addEventListener('submit', event => {
  event.preventDefault()
  renderPokemon(input.value.toLowerCase())
})

buttomPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1
    renderPokemon(searchPokemon)
  }
})

buttomNext.addEventListener('click', () => {
  searchPokemon += 1
  renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)
