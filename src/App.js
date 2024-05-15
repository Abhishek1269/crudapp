import React, { useEffect, useState } from 'react'
import {Empdata} from './Empdata'
import "./App.css"

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [id, setid] = useState(0)
  const[updated, setUpdated] = useState(false);

  useEffect(() => {
    setData(Empdata)
  }, [])

  const edithandler = (id) => {
    const d = data.filter(item => item.id === id);
    if(d !== undefined){
      setUpdated(true);
      setid(id);
      setFirstName(d[0].firstName);
      setLastName(d[0].lastName);
      setAge(d[0].age);
    }
  }

  const deletehandler = (id) => {
    if(id > 0){
      if(window.confirm("Are you sure ?")){
        const d = data.filter(item => item.id !== id);
        setData(d);
      }
    }
  }

  const savehandler = (e) => {
    e.preventDefault();
    const d = [...data];
    const newObj = {
      id : Empdata.length + 1,
      firstName : firstName,
      lastName : lastName,
      age : age,
    }
    d.push(newObj);
    setData(d);
  }

  const updatehandler = () => {
    const index = data.map((item) => {
      return item.id
    }).indexOf(id);

    const d = [...data];
    d[index].firstName = firstName;
    d[index].lastName = lastName;
    d[index].age = age;

    setData(d);
    clearhandler();

  }

  const clearhandler = () => {
    setid(0);
    setFirstName('');
    setLastName('');
    setAge('');
    setUpdated(false);
  }
  return (
    <div>
      <h1 className='heading'>CRUD APP</h1>
      <div className='dataform'>
        <div>
          <label>First Name : 
            <input type='text' placeholder='Enter First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          </label>
        </div>

        <div>
          <label>Last Name : 
            <input type='text' placeholder='Enter Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          </label>
        </div>

        <div>
          <label>Age : 
            <input type='text' placeholder='Enter Age' value={age} onChange={(e) => setAge(e.target.value)}/>
          </label>
        </div>

        <div>
          {
            updated === false ?
            <button className='btn btn-primary' onClick={(e) => savehandler(e)}>Save</button>
            :
            <button className='btn btn-primary' onClick={() => updatehandler()}>Update</button>
          }
        <button className='btn btn-danger' onClick={() => clearhandler()}>Clear</button>
        </div>
      </div>
      <table className='table table-hover'>
        <thead>
          <tr>
            <td>S.No.</td>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Operation</td>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => {
              return(
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.age}</td>
                    <td>
                      <button className='btn btn-primary' onClick={() => edithandler(item.id)}>Edit</button>
                      <button className='btn btn-danger' onClick={() => deletehandler(item.id)}>Delete</button>
                    </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
