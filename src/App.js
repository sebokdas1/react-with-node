import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);
  const handleAddUsers = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };

    //post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUser = [...users, data]
        setUsers(newUser)
      })

  }
  return (
    <div className="App">
      <h3>my own react app {users.length}</h3>

      <form onSubmit={handleAddUsers}>
        <input type="text" name='name' placeholder='Name' required />
        <input type="text" name='email' placeholder='Email' required />
        <input type="submit" value="Add User" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>id:{user.id} name:{user.name} email:{user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
