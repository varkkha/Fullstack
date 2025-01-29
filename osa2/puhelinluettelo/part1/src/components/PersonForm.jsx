const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addName }) => {
    return (
        <form onSubmit={addName}>
        <div>
          name: <input
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handleNumberChange}
          /></div>
          <button type="submit">add</button>
        </form>
    )
  }

  export default PersonForm