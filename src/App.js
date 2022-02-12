import { useEffect, useState } from 'react';
import './App.css';
import Header from './Layout/Homepage/Header/Header';
import Main from './Layout/Homepage/Main/Main';
import { db } from './firebase-config';
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'

function App() {
  const [newName, setNewName] = useState('');
  const [age, setAge] = useState(0);
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, 'users');
  console.log(userCollectionRef);

  useEffect(() => {
    

    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(userCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  const createUser = async () => {
    await addDoc(userCollectionRef, { name: newName, age: Number(age) });
    getUsers();
  }

  const updateUser = async (id, age) => {
    const userDoc = doc(db, 'users', id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
    getUsers();
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
    getUsers();
  }

  return (
    <div className="">
      <input type="text" placeholder="Name" onChange={(e) => setNewName(e.target.value)} />
      <input type="text" placeholder="Age" onChange={(e) => setAge(e.target.value)} />
      <button onClick={createUser} >Create User</button>
      {users.map((user, id) => (
        <div key={id}>
          <h3>{user.name}</h3>
          <p>{user.age}</p>
          <button onClick={() => updateUser(user.id, user.age)}>Increase</button>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
