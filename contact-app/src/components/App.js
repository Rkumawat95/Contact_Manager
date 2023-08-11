import React, { useState, useEffect } from 'react'
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './Header'
import Addcontact from './Addcontact'
import ContactList from './ContactList'
import { v4 } from 'uuid';
import api from '../api/contacts'
import ContactDetail from './ContactDetail'
import Editcontact from './Editcontact'

function App() {
  const Local_Storage_key = "contacts";
  const [Contacts, setContact] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult,setSearchResult] = useState([]);

  //retrieveContacts
  const retrieveContacts = async() => {
    const response = await api.get('/contacts');
    return response.data;
  }

  const addContactHandler = async(contact) => {
    const request = {
      id:v4(),
      ...contact,
    }
    const response = await api.post("/contacts",request);
    setContact([...Contacts, response.data]);
  }

  const updateContactHandler = async(contact) => {
    const response = await api.put(`/contacts/${contact.id}`,contact);
    const {id,name,email} = response.data;
    setContact(Contacts.map(contact=>{
      return contact.id === id ? {...response.data} : contact
    }));
  };

  useEffect(() => {
    // const retriveData = JSON.parse(localStorage.getItem(Local_Storage_key));
    // if (retriveData) setContact(retriveData)
    const getAllContacts = async() =>{
      const allContacts = await retrieveContacts();
      if(allContacts){ setContact(allContacts )}
    }
    getAllContacts();
  }, [])

  useEffect(() => {
    //if(!localStorage.getItem(Local_Storage_key))
    //localStorage.setItem(Local_Storage_key, JSON.stringify(Contacts));
  }, [Contacts])

  const removeContactHandler = async(id) => {
    await api.delete(`/contacts/${id}`);
    const data = Contacts.filter((contact) => {
      return contact.id !== id;
    })
    setContact(data);
  }

  const searchHandler = (searchTerm) =>{
    setSearchTerm(searchTerm);
    if(searchTerm !== ""){
      const newcontactlist = Contacts.filter((contact)=>{
        return Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      })
      setSearchResult(newcontactlist)
    }
    else{
      setSearchResult(Contacts)
    }
  };

  return (
    <div className=''>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={< ContactList term={searchTerm} searchkeyword={searchHandler} Contacts={searchTerm.length<1 ? Contacts:searchResult} getContactId={removeContactHandler} />} />
          <Route exact path='/add' element={< Addcontact addContactHandler={addContactHandler} />} />
          <Route exact path='/edit' element={< Editcontact updateContactHandler={updateContactHandler} />} />
          <Route exact path='/contact/:id' element={< ContactDetail/>} />
        </Routes>
      </Router>
    </div>
  )
}


export default App;