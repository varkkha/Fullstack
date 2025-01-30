import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import { useEffect } from 'react'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        const updatedPerson = { ...existingPerson, number: newNumber }

        personsService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person =>
            person.id !== existingPerson.id ? person : returnedPerson
          ))
          setNewName('')
          setNewNumber('')
        })
    }
    return
  }

    const personObject = { name: newName, number: newNumber }
    personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(prevPersons => [...prevPersons, returnedPerson])
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)

    if (errorMessage) {
      setErrorMessage('')
    }
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDeletePerson = (name, id) => {
    return () => {
      if (window.confirm(`Delete ${name} ?`)) {
        personsService
          .deletePerson(id)
          .then(() => {
            setPersons(persons.filter(n => n.id !== id));
            setNewName("");
            setNewNumber("");
          })
      }
    };
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm
              newName={newName}
              newNumber={newNumber}
              handleNameChange={handleNameChange}
              handleNumberChange={handleNumberChange}
              addName={addName}/>

      <h2>Numbers</h2>
      <div>
        <Persons
              persons = {filteredPersons}
              handleDeletePerson={handleDeletePerson}/>
      </div>
    </div>
  )

}

export default App
