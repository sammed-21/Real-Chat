import React, { useState, useEffect } from 'react'
import client,{ databases,DATABASE_ID ,COLLECTION_ID_MESSAGE} from "../appwriteConfig"
import '../index.css'
import { ID, Query,Role, Permission} from 'appwrite'
import Header from '../components/Header'
import {Trash2} from 'react-feather'
import { useAuth } from '../utils/AuthContext'
const Room = () => {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])


  const [messageBody, setMessageBody] = useState([])
  

  useEffect(  () => {
    getMessages()
    const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGE}.documents`, response => {
       
      if (response.events.includes("databases.*.collections.*.documents.*.create")) {
        console.log('a message was created')
        setMessages(prevState => [response.payload, ...prevState])
      }
      if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
        console.log('a message was deleted!!')
        setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
            }
      
    })
    console.log('unsubscribe:', unsubscribe)
    return () => {
      unsubscribe()
    }
  }, [])


  
  const getMessages = async ()=>{
    
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_MESSAGE,
      [
        Query.orderDesc('$createdAt'),
        Query.limit(20)
      ]
    );
    console.log("response ", response)
    setMessages(response.documents)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      user_id: user.id,
      username:user.name,
      body:messageBody  
    } 
    let permissions = [
      Permission.write(Role.user(user.$id))
    ]
    let response = await databases.createDocument(DATABASE_ID,
      COLLECTION_ID_MESSAGE,
      ID.unique(),
      payload,
      permissions
    ) 
    console.log('created! ', response)
     setMessageBody('') 
     
  
  }

  const deleteMessage = async (id) => {
    console.log('cliked delete');
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGE, id);// setMessages(prevState => messages.filter(message => message.$id!==message_id))
    // setMessages(prevState => prevState.filter(message => message.$id !== id))}


  }



  return (
    <main className='container'>
        <Header/>
      <div className='room--container'>
      <form id="message--form" onSubmit={handleSubmit}>
            <div>
                <textarea 
                    required 
                    maxLength="200"
                    placeholder="Say something..." 
                    onChange={(e) => {setMessageBody(e.target.value)}}
                    value={messageBody}
                    ></textarea>
            </div>

            <div className="send-btn--wrapper">
            {/* <input className="btn btn--secondary" type="submit" value="send"/> */}
            <button type="submit" id="bottone5">send</button>
            </div>
        </form>
        <div>

        {messages.map(message => (
  <div key={message.$id} className='message--wrapper'>
            <div className='message--header'>
              <p>
                {message?.username ?(
                  <span>{message.username}</span>) : (
                    <span>Anonymous user</span>
                  )}
              <small className='message-timestamp'>{new Date(message.$createdAt).toLocaleString()}</small>
              </p>
              {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                            <Trash2 className="delete--btn" onClick={() => {deleteMessage(message.$id)}}/>
                            
                        )}
    </div>
    <div className='message--body'> 
      <span>
        {message.body}
      </span>
    </div>
  </div>
))}
        </div>
      </div>
    </main>
  )
}

export default Room