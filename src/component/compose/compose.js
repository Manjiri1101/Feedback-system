import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { API } from 'aws-amplify';
import { Modal, Container, Row, Card, Alert, Col, Collapse} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './compose.css';
import { listFeedbacks } from '../../graphql/queries';
import { createFeedback as createFeedbackMutation, updateFeedback as updateFeedbackMutation, deleteFeedback as deleteFeedbackMutation } from '../../graphql/mutations';

const initialFormState = { recipient: '', feedback: '', sender: '' }

function Compose() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [receivedFeedbacks, setReceivedFeedbacks] = useState([]);
    const [sentFeedbacks, setSentFeedbacks]= useState([]);
    //const [budget, setBudgets] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const [senderEmail, setSenderEmail] = useState('');
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        getEmail();
        fetchFeedbacks();
    }, []);

    async function fetchFeedbacks() {
        const user = await Auth.currentAuthenticatedUser();
        const apiData = await API.graphql({ query: listFeedbacks });
        console.log("apidata", apiData)
        // console.log("senderEmail = " + senderEmail);
        const inboxres = apiData.data.listFeedbacks.items.filter(item => item.recipient == user.attributes.email); 
        console.log("inbox res ", inboxres);
        setReceivedFeedbacks(inboxres);
        const sentres = apiData.data.listFeedbacks.items.filter(item => item.sender == user.attributes.email);
        setSentFeedbacks(sentres);
        console.log("sent res", sentres);
    }
    async function getEmail() {
        try {

            const user = await Auth.currentAuthenticatedUser();
            // var email = user.attributes.email;
            //console.log("Before setting: " + email);
            //setSenderEmail(email);
            //console.log("senderEmail set successfully. " + senderEmail);
            setFormData({ ...formData, sender: user.attributes.email });
            setSenderEmail(user.attributes.email);
            console.log("in async function", user.attributes.email);
            // await Auth.currentAuthenticatedUser().then(user => {
            //     setSenderEmail(user.attributes.email); 
            //     setFormData({ ...formData, sender: user.attributes.email });
            //     console.log("Hello from 'then()'" + " User email is " + senderEmail);
            // });
        }
        catch (err) {
            console.log(err);
        }
    }
    async function createFeedback() {
        if (!formData.recipient || !formData.feedback) return;
        //getEmail();
        formData.recipient = formData.recipient + "@techcorp.com";
        console.log("Recipient is " + formData.recipient);
        await API.graphql({ query: createFeedbackMutation, variables: { input: formData } });
        setFeedbacks([...feedbacks, formData]);
        setFormData(initialFormState);
    }
    async function deleteFeedback({ id }) {
        const newFeedbacksArray = feedbacks.filter(feedback => feedback.id !== id);
        setFeedbacks(newFeedbacksArray);
        await API.graphql({ query: deleteFeedbackMutation, variables: { input: { id } } });
    }
    return (
        <div>
            <h>Compose Feedback:</h>
            <>
                <button type="button" class="btn btn-primary" onClick={handleShow}>
                    Compose Feedback
                </button>

                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Please write a feedback</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            onChange={e => setFormData({ ...formData, 'recipient': e.target.value })}
                            placeholder="Write recipient name"
                            value={formData.recipient}
                        />@techcorp.com
                         <br />
                        <input
                            onChange={e => setFormData({ ...formData, 'feedback': e.target.value })}
                            placeholder="write feedback"
                            value={formData.feedback}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                         </Button>
                        <button onClick={createFeedback}>Ok</button>
                    </Modal.Footer>
                </Modal>
            </>
            <h1>INBOX</h1>
            <Container>
                   <div className="paper">
                        <div className="col" style={{ marginBottom: 30 }}>                     
                            {
                                receivedFeedbacks.map(feedback=> (                            
                                    <div key={feedback.id || feedback.recipient}>
                                        <p>{feedback.recipient}</p>
                                        <p>Feedback: {feedback.feedback}</p>
                                        <p>Sender:{feedback.sender}</p>
                                        <button onClick={() => deleteFeedback(feedback)}>Delete feedback</button>
                                    </div> 
                                ))                             
                            }
                            <br />
                        </div>
                        <br />
                        </div>
                        </Container>
                        <div>
                        <Button
                        onClick={() => setOpen(!open)}
                         aria-controls="example-collapse-text"
                        aria-expanded={open}
                         >
                               Sent Feedbacks
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
          Sent box
          <div className="col" style={{ marginBottom: 30 }}>                     
                            {
                                sentFeedbacks.map(feedback=> (                            
                                    <div key={feedback.id || feedback.recipient}>
                                        <p>{feedback.recipient}</p>
                                        <p>Feedback: {feedback.feedback}</p>
                                        <p>Sender:{feedback.sender}</p>
                                        
                                    </div> 
                                ))                             
                            }
                            <br />
                        </div>
        </div>
      </Collapse>
                        </div>
                 
        </div>
    );
}
export default Compose;
/*
   <input
                onChange={e => setFormData({ ...formData, 'recipient': e.target.value})}
                placeholder="Write recipient name"
                value={formData.recipient}
            />@techcorp.com
            <input
                onChange={e => setFormData({ ...formData, 'feedback': e.target.value})}
                placeholder="write feedback"
                value={formData.feedback}

            />
            <button onClick={createFeedback}>Ok</button>
*/