import React, { useState, useEffect } from 'react';
import { Auth, API } from 'aws-amplify';
import {Navbar} from  'react-bootstrap';
import { listFeedbacks } from '../../graphql/queries';
import { createFeedback as createFeedbackMutation, updateFeedback as updateFeedbackMutation } from '../../graphql/mutations';

function Display(){

   /* const [user, setUsers] = useState(null);
    const [formData, setFormData] = useState({});
    const [name, setNames] = useState([]);
    useEffect(() => {
    (async function() {	
      try {
      const user = await Auth.currentAuthenticatedUser();
      setUsers(user);
      console.log("in async function", user.attributes.email)
      }
      catch {
      setUsers(null);
      }
      }
      
    
      )();
     
      fetchUsers()
    }, []);

    async function fetchUsers() {	
        const apiData = await API.graphql({ query: listFeedbacks });	
        console.log("items are: ", apiData)	
        setUsers(apiData.data.listFeedbacks.items);	
      }
 async function createUser() {
    console.log("In create user - name()")
    //if (!formData.sender || !formData.name) return;
    await API.graphql({ query: createFeedbackMutation, variables: { input: formData } });
    setNames([ ...name, formData ]);
    setFormData({});
    console.log("MMMM")
    fetchUsers();
  } */


    return(
        <div>
            
    
        </div>
    );


}
export default Display;

/*
<input onChange={e => setFormData({ ...formData, 'name': e.target.value})}
                                placeholder="Name">
                  </input>
                  <button onClick={createUser}>OK</button> <div style={{marginBottom: 30}}></div>
*/