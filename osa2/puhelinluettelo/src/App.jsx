import { useEffect, useState } from "react";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    })
    },[]);

  const notify = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 5000);
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    const personObject = { name: newName, number: newNumber };
    const existing = persons.find((person) => person.name === newName);
    if (existing) {
      updateNumber(existing.id, personObject);
      return;
    }
    personsService.create(personObject).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
      notify(`${newName} added`);
    });
  };

  const updateNumber = (id, personObject) => {
    if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
      personsService.updateNumber(id, personObject).then((response) => {
        setPersons(persons.map((person) => person.id !== id ? person : response.data));
        setNewName("");
        setNewNumber("");
        notify(`${personObject.name} number updated`);
      });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.delete(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
        notify(`${person.name} deleted`);
      });
    }
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
      <Notification message={message} />
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
            <button onClick={() => deletePerson(person.id)}>delete</button>
        </div>
        ))}

      </div>
    </div>
  );
};

export default App;
