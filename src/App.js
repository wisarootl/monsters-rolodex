import { useState, useEffect } from 'react'

import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component'
import './App.css'

const App = () => {
  console.log('render')
  const [searchField, setSearchField] = useState('')
  const [monsters, setMonsters] = useState([])
  const [filteredMonsters, setFilterMonsters] = useState(monsters)

  console.log(searchField)

  useEffect(() => {
    console.log('effect')
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users))
  }, [])

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField)
    })

    setFilterMonsters(newFilteredMonsters)
  }, [monsters, searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase()
    setSearchField(searchFieldString)
  }

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>

      <SearchBox
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  )
}

export default App
