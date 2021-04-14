import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import Paragraph from './components/Paragraph'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //Add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1

    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  //Delete Comment
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle remaider
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle,
      reminder: !taskToToggle.reminder }

      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updTask)
      })

      const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
  }

function highlightSelection() {
        var userSelection = window.getSelection();
        
        //Attempting to highlight multiple selections (for multiple nodes only + Currently removes the formatting)
        for(var i = 0; i < userSelection.rangeCount; i++) {
          //Copy the selection onto a new element and highlight it
          var node = highlightRange(userSelection.getRangeAt(i)/*.toString()*/);
          // Make the range into a variable so we can replace it
          var range = userSelection.getRangeAt(i);
          //Delete the current selection
          range.deleteContents();
          //Insert the copy
          range.insertNode(node);
        }
        
        //highlights 1 selection (for individual nodes only + Need to uncomment on the bootom)
        //highlightRange(userSelection.getRangeAt(0));
        
        //Save the text to a string to be used if yoiu want to
        /*var string1 = (userSelection.getRangeAt(0));
        alert(string1);*/
      
      }
      
      //Function that highlights a selection and makes it clickable
      function highlightRange(range) {
          //Create the new Node
          var newNode = document.createElement("span");
          
          // Make it highlight
          newNode.setAttribute(
             "style",
             "background-color: yellow;"
          );
          
          //Make it "Clickable"
          newNode.onclick = function(){
          // if (confirm("do you want to delete it?")) {
          //   deletenode(newNode);
          // } else {
          //   alert(range);
          // }
        };
        
          
          //Add Text for replacement (for multiple nodes only)
          //newNode.innerHTML += range;
          newNode.appendChild(range.cloneContents());
          
          //Apply Node around selection (used for individual nodes only)
          //range.surroundContents(newNode);
          
          return newNode;
      }
      
      function deletenode(node){
        var contents = document.createTextNode(node.innerText);
        node.parentNode.replaceChild( contents, node);
      }
  
document.addEventListener('mouseup', () => {
  const selection = window.getSelection().toString();

  if (selection != '') {
      highlightSelection();
  }
});

  return (
    <Router>
    <div className="App">
      <Paragraph />
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      
      <Route path='/' exact render={(props) =>  (
        <>
          {showAddTask && <AddTask onAdd={addTask} />}
          {tasks.length > 0 ? <Tasks tasks= {tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : ('No comments to show')}
        </>
      )} />
      <Route path='/about' component={About} />
      <Footer />
    </div>
    </Router>
  );
}

export default App;
