import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { API } from 'aws-amplify';
import { Modal, Container, Row, Card, Alert, Col, Collapse, Form, Navbar, Nav, Tab } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './compose.css';
import { listFeedbacks } from '../../graphql/queries';
import { GrChat,GrEdit, GrTrash } from "react-icons/gr";
import { createFeedback as createFeedbackMutation, updateFeedback as updateFeedbackMutation, deleteFeedback as deleteFeedbackMutation } from '../../graphql/mutations';
const initialFormState = { recipient: '', feedback: '', sender: '' }

function Compose() {

    const [feedbacks, setFeedbacks] = useState([]);
    const [receivedFeedbacks, setReceivedFeedbacks] = useState([]);
    const [sentFeedbacks, setSentFeedbacks] = useState([]);
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
            <>
                <Button variant="primary" onClick={handleShow}>
               
                    Compose &nbsp;
                </Button>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Please write a feedback</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Write recipient firstname.lastname (eg john.smith )</Form.Label>
                                <Form.Control size="lg" type="email"
                                    onChange={e => setFormData({ ...formData, 'recipient': e.target.value })}
                                    placeholder="Recipient email"
                                    value={formData.recipient}
                                />   @techcorp.com
                                 <br />
                                <Form.Control as="textarea" rows={3}
                                    onChange={e => setFormData({ ...formData, 'feedback': e.target.value })}
                                    placeholder="Write feedback"
                                    value={formData.feedback}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                         </Button>
                        <Button variant="primary" onClick={createFeedback}>Ok</Button>
                    </Modal.Footer>
                </Modal>
            </>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={1}>
                        <Nav variant="pills" className="flex-column ">
                            <Nav.Item>
                                <Nav.Link eventKey="first" >Inbox</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" >Sent Box</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={11}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <h1>INBOX <GrChat/></h1>
                                <Container>
                                <div  style={{ marginBottom: 30 }}>
                                                {
                                                    sentFeedbacks.map(feedback => (
                                                        <div className="paper" key={feedback.id || feedback.recipient}>
                                                            <div >   
                                                                    <p><b>Sender</b>: {feedback.sender}</p>                  
                                                                    <p><b>Feedback</b>: {feedback.feedback}</p>
                                                                    <p><b>Sent Time</b>: {feedback.createdAt}</p>
                                                                                               
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                
                                            </div>
                                </Container>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <div>
                                    <div >
                                        <h1>Sent Feedbacks</h1>
                                        <Container>
                                         
                                            <div >
                                        <div className="col container" style={{ marginBottom: 30 }}>
                                            {
                                                receivedFeedbacks.map(feedback => (
                                                    <div  className="paper" key={feedback.id || feedback.recipient}>
                                                        <p><b>Recipent </b> :&nbsp; {feedback.recipient}</p>
                                                        <p><b>Feedback  </b> :&nbsp; {feedback.feedback}</p>
                                                        <p><b>Sender  </b> :&nbsp; {feedback.sender}</p>
                                                        <p><b>Recieved time  </b> :&nbsp;  {feedback.createdAt}</p>
                                                        <Button variant="primary" onClick={() => deleteFeedback(feedback)}><GrTrash/></Button> 
                                                        
                                                    </div>
                                                ))
                                            }
                                            <br />
                                        </div>
                                        <br />
                                    </div>
                                            </Container>
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            <>

            </>
        </div>
    );
}
export default Compose;


/*
 <Button variant="secondary"
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    Sent Feedbacks
                        </Button>
*/