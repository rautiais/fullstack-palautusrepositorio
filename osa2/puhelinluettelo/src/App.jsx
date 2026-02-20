import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addNewPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
  
      <div>
        filter shown with{" "}
        <input
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
  
      <h3>Add a new</h3>
  
      <form onSubmit={addNewPerson}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
  
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
  
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  
      <h3>Numbers</h3>
  
      <div>
        {personsToShow.map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
