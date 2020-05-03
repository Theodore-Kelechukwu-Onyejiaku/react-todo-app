import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";


const style = {
  textAlign: "center"
}


let id = 0;

const List = props => (
      <li className="list-group-item">
        <input onChange={props.toggleTodo} className="checkbox-light" type='checkBox'/>
        <span>{props.list.text}</span>
        <button onClick={props.onRemove} style={{float: "right"}} className="btn btn-danger">Remove</button>
      </li>
)

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.onInput = this.onInput.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);

    this.state = {
      list: [],
      input: ""
    }
  }

  onInput(e){
    this.setState({
      input: e.target.value
    })
  }

  onAdd(){
    //if(this.state.input === "") return
    const text = prompt("Add to do")
    this.setState({
      list: [...this.state.list, {text: text, id: id++, checked: false}],
      input: ""
    })
  }

  onRemove(id){
    this.setState({
      list: this.state.list.filter(item => item.id !== id)
    })
  }

  toggleTodo(id){
    this.setState({
      list: this.state.list.map(todo =>{
        if(todo.id !== id) return todo
      return {
        id : todo,
        text : todo.text,
        checked: !todo.checked
        }
      })
    })  
  }

render (){
    return (
      <div className="App">
        <div className="container">
          <h1 className="text-center">Welcome to TO-DO list application</h1>
          <div>Total Todos: {this.state.list.length}</div>
          <div>Undone Todos: {this.state.list.filter(todo => !todo.checked).length}
          </div>
          <ul className="list-group"> 
            {this.state.list.map(todo => <List list={todo} checked={todo.checked} onRemove={()=>this.onRemove(todo.id)} toggleTodo={()=> this.toggleTodo(todo.id)}/>)}
          </ul>
          <hr/>
          <button className="btn btn-success" onClick={this.onAdd}>Add Todo</button>
        </div>
      </div>
    );
  }  
}

