const Persons = ({ persons, handleDeletePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}> {person.name} {person.number}
          <button onClick={handleDeletePerson(person.name, person.id)}>
          Delete
        </button></p>
      ))}
    </div>
  )
}

export default Persons