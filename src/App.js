import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList';
import SelectOptions from './SelectOptions'
import { v4 as uuidv4 } from 'uuid';
import {useState, useRef, useEffect} from 'react';
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'

const LOCAL_STORAGE_KEY = 'todosApp.todos'
const LOCAL_STORAGE_KEY_PERSONS = 'todosApp.persons'


function App() {
  const [todos, setTodos] = useState([])
  const [persons, setPersons] = useState([])
  const todoNameRef = useRef();
  const todoPersonRef = useRef();
  const todoClearPersonRef = useRef();
  const addPersonRef = useRef();


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)  
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    const storedPerson = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_PERSONS))
    if (storedPerson) setPersons(storedPerson)  
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PERSONS, JSON.stringify(persons))
  }, [persons])


  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.status = !todo.status
    setTodos(newTodos)
  }

  function removeTodo(id){
    const newTodos = [...todos]
    newTodos.splice(newTodos.find(todo => todo.id === id),1);
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value;
    const person = document.getElementById("persons").value;
    if(name === '' && person === '')return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, person: person ,status: false}]
    })
    todoNameRef.current.value = null;
    

  }


  function handleClearDoneTodos(e){
    const newTodos = todos.filter(todo => !todo.status)
    setTodos(newTodos)
  }

  function handleClearPersonTodos(e){
    const person = document.getElementById("personsResponsibilityRemoval").value;
    if(person === '') return
    const newTodos = todos.filter(todo => todo.person !== person)
    console.log(newTodos)
    setTodos(newTodos)
  }

  function handleAddPerson(e){
    const person = addPersonRef.current.value;
   
    if (person === '') return
    setPersons(prevPersons => {
      return [...prevPersons, {id : uuidv4(), name: person}]
    })
    console.log(persons)
    addPersonRef.current.value = null
  }

  function handleRemovePerson(e){
    const personRemove = document.getElementById("personsRemoval").value;
    console.log(personRemove)
    if(personRemove === '') return
    const newTodos = todos.filter(todo => todo.person !== personRemove)
    const newPersons = persons.filter(person => person.name !== personRemove)
    setTodos(newTodos)
    setPersons(newPersons)
    
  }

  const cardStyle = {
    backgroundColor: "transparent",
    border: "none",
    margin: "1%"
  }

  const bodyStyle = {
    display: 'flex', 
    marginLeft: '25%', 
    marginTop: '15%'
  }


  return (
    <> 
      <div id="Body" className = "d-flex align-items-center justify-content-center" style={bodyStyle}>
        <ListGroup>
          <p>
            List of Persons and their responsiblities:
            <TodoList todos = {todos} toggleTodo = {toggleTodo} removeTodo={removeTodo}/>
            <div>
              {todos.length} tasks are left to do.
            </div>
          </p>
        </ListGroup>
        <Card id="AssignTask" style={cardStyle}>
          <p>Add/remove a Task:</p>
          <label>task: </label>
          <input ref={todoNameRef} type="text"/>
          <br></br>
          <label>person responsible: </label>
          <select name="persons" id="persons"><option value=''>Select a person...</option><SelectOptions persons={persons}/></select>
          <Button size="sm" onClick={handleAddTodo}>add todo</Button>
          <br></br>
          <Button size="sm" variant="danger" onClick={handleClearDoneTodos}>Remove Selected todos</Button>
          <br></br>
        </Card>
        <Card style={cardStyle}>
          <p> Add/Remove Person & their responsiblities:</p>
          <label>Add person: </label>
          <input ref={addPersonRef} type="text"/>
          <Button size="sm" onClick={handleAddPerson}>Add Person</Button>
          <br></br>
          <label>Remove Person: </label>
          <select name="persons" id="personsRemoval"><option value=''>Select a person...</option><SelectOptions persons={persons}/></select>
          <Button size="sm" variant="danger" onClick={handleRemovePerson}>remove selected person</Button>
          <br></br>
          <label>remove person's responsiblities: </label>
          <select name="persons" id="personsResponsibilityRemoval"><option value=''>Select a person...</option><SelectOptions persons={persons}/></select>
          <Button size="sm" variant="danger" size="sm" onClick={handleClearPersonTodos}>clear person</Button>
          <br></br>
        </Card>
      </div>
      
    </>
  )
}

export default App;
