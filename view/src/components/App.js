import React from 'react';
import { render } from 'react-dom';

class App extends React.Component
{
    constructor()
    {
        super();//get all parent react classes
        this.state={
            text:"",
            todos:[],
            id:""
        };
        this.addTodo = this.addTodo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //^^^method is out of local scope
    }

    addTodo(e)
    {
        if(this.state.id)//if id exists - then it's an edit 
        {
            //console.log("edit",this.state.id,this.state.text)
            fetch('/api/'+this.state.id,
            {
                //HTTP PAYLOAD
                method:'PUT',
                body:JSON.stringify(this.state),
                headers:
                {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res => console.log('Edit : Status',res.status))
            .catch(err => console.log('Edit Error found:',err));
        }

        else
        {
            fetch('/api',//optional to use axios npm module
            {
                //HTTP PAYLOAD
                method:'POST',
                body:JSON.stringify(this.state),
                headers:
                {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res => console.log('Todo Sent: Status',res.status))
            .catch(err => console.log('Error found:',err));
    
            this.setState({text:""});//clear text field     
        }
        this.fetchTodos();//update the front if a new task is added
        e.preventDefault() //Do not refresh page on for submit
    }

    tCheck(id)
    {
        fetch('/api/check/' + id,//check or uncheck todo progress
        {
            //HTTP PAYLOAD
            method:'PUT',
            body:"",
            headers:
            {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res => console.log('Check : Status',res.status))
        .catch(err => console.log('Check Error found:',err));
        this.fetchTodos();//update the front if a new task is added
        //e.preventDefault() //Do not refresh page on for submit
    }

    tEdit(id,todo)
    {

        //this.fetchTodos();//update
        this.setState({
            text:todo,
            id:id//Dynamically create an id for editing
        })
        //this.addTodo(id);
        //console.log("tEdit",id,todo);

    }

    //similiar to JS -- window.onload
    componentDidMount()//execute as soon as the webpage//app loads
    {
        this.fetchTodos();
    }

    fetchTodos()
    {
        fetch('/api')//HTTP_GET is default
        .then(res => res.json())
        .then(data => 
        {
            this.setState({todos:data.data});
            //console.log(this.state.todos);
        })
        .catch(err => console.log('Error found:',err));
    }

    tDelete(id)
    {
        fetch('/api/'+ id,
        {
            method:'DELETE',
            body:"",
            headers:
            {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res => console.log('Deleted : Status',res.status))
        .catch(err => console.log('Check Error found:',err));
        this.fetchTodos();//update the front if a new task is added
    }

    handleChange(e)
    {
        const input = e.target.value;
        this.setState(
        {
            text:input
        });
    }

    render()
    {
        const input=this.state.text;
        return(
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href='/'>MERN</a>
                    </div>
                </nav>

                <div className="container ">
                <br/>
                <h3 style={{textAlign:'center'}}>We Have Things To Do!</h3>
                <h6 style={{textAlign:'center'}}>Click on a Todo to edit!</h6>

                    <div className="row">
                        <div className="card col s6 z-depth-1">
                        <h4 className="flow-text" style={{textAlign:'center'}}>UnFinished</h4>
                            <ul className="collection">
                                {
                                    this.state.todos.map(todo =>
                                    {
                                        if(todo.complete==false)
                                            return(
                                                <li key={todo._id} className="collection-item">{todo.text}
                                                    <i onClick={() => this.tCheck(todo._id)} className="tiny material-icons right">chevron_right</i>
                                                    <i onClick={() => this.tDelete(todo._id)} className="tiny material-icons right">close</i>
                                                    <i onClick={() => this.tEdit(todo._id,todo.text)} className="tiny material-icons right">edit</i>
                                                </li>
                                            )
                                    })
                                }
                            </ul>
                        </div>
                
                        <div className="card col s6 z-depth-1 ">
                        <h4 className="flow-text" style={{textAlign:'center'}}>Finished</h4>
                            <ul className="collection">
                            {
                                this.state.todos.map(todo =>
                                {
                                    if(todo.complete==true)
                                        return(
                                            <li key={todo._id} className="collection-item">{todo.text}
                                                    <i onClick={() => this.tCheck(todo._id)} className="tiny material-icons left">chevron_left</i>
                                                    <i onClick={() => this.tDelete(todo._id)} className="tiny material-icons left">close</i>
                                                    <i onClick={() => this.tEdit(todo._id,todo.text)} className="tiny material-icons left">edit</i>
                                            </li>
                                        )
                                })
                                }                            
                            </ul>
                        </div>
                    </div>    

                    <div className="row">
                        <form onSubmit={this.addTodo}>
                            <div className="input-field col s4 push-s4">
                                <input value={input} onChange={this.handleChange} autoFocus for="icon_prefix" type="text" placeholder="What Todo!"/>
                                <i className="material-icons prefix sm">play_arrow</i>
                            </div>
                        </form>                        
                    </div>
                </div>
            </div>
        );
    }
}
export default App;