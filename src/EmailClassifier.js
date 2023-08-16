import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import './EmailClassifier.css'

const EmailClassifier = () => {
  const [emailText, setEmailText] = useState('');
  const [classification, setClassification] = useState('');

  const classifyEmail = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci/completions', 
        {
          text: emailText,
        }
      );

      setClassification(response.data.classification);
    } catch (error) {
      console.error('Error classifying email:', error);
    }
  };

  return (
    <Container>
      <h1>Email Classifier</h1>
      <Form>
        <Form.Group controlId="emailText">
          <Form.Label>Enter Email Body:</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={classifyEmail}>
          Classify
        </Button>
      </Form>
      {classification && (
        <div className="mt-3">
          <h2>Classification:</h2>
          <p>{classification}</p>
        </div>
      )}
    </Container>
  );
};

export default EmailClassifier;
