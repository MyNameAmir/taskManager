import React from 'react'
import TodoList from './TodoList'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Todo({todo, toggleTodo, removeTodo}) {

    function handleTodoClick(){
        toggleTodo(todo.id);
    }

    function handleRemoveTodo(){
        removeTodo(todo.id)
    }

    const cardStyle = {
        background: "rgba(173, 216, 230, .5)",
        border: "none",
        margin: "1%"
    }
      
    const personStyle = {
        opacity: 1
    }
    

    return (
        <div>
            <ListGroup.Item style={cardStyle}>
                <Container>
                    <Row className="justify-content-md-left">
                        <Col md="auto"><input type="checkbox" checked={todo.status} onChange={handleTodoClick}/></Col>
                        <Col ><p style={personStyle}>{todo.name}, {todo.person}</p></Col>
                        <Col md="auto" xs lg="2"><Button variant="danger" size="sm" onClick={handleRemoveTodo}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </ListGroup.Item>
        </div>
    )
    
}
