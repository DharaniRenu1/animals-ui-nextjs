import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { CatsService } from '@/services/api/cats-service'

interface FormData {
  name: string;
  description: string;
}



const service = new CatsService()

export default function CommonForm(isEditForm: any ) {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
      });
 

      useEffect(()=>{
        if(isEditForm.isEditForm){
            setFormData(isEditForm.cat)
          }
      }, [isEditForm])

      const [catnameError, setCatnameError] = useState(false);
      const [catdescriptionError, setCatdescriptionError] = useState(false);
      const [formSubmitted, setFormSubmitted] = useState(false);
      const [formError, setFormError] = useState("");

     
      const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // Validate catname and catdescription fields
        if (!formData.name.trim()) {
          setCatnameError(true);
          return;
        } else {
          setCatnameError(false);
        }
    
        if (!formData.description.trim()) {
          setCatdescriptionError(true);
          return;
        } else {
          setCatdescriptionError(false);
        }
    

        if(isEditForm.isEditForm)
        {
          try {
            const response = await fetch(`http://localhost:8080/api/1/cats/${isEditForm.cat.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
      
            if (!response.ok) {
              throw new Error('There was an error updating the form');
            }
      
            setFormSubmitted(true);
            setFormData({  name: '', description: ''});
      
          } catch (error) {
            setFormError("Unable to update.. Please try again");
          }
        }
        else
        {
          try {
            const response = await fetch('http://localhost:8080/api/1/cats', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
      
            if (!response.ok) {
              throw new Error('There was an error submitting the form');
            }
      
            setFormSubmitted(true);
            setFormData({  name: '', description: ''});
      
          } catch (error) {
            setFormError("Unable to register.. Please try again");
          }
        };
        }

      
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
      const handleFormSubmitted = () => {
        setFormSubmitted(false)
      }
    
  return (
    <>
     {formSubmitted ? (
        <>
         
          <div  style={{color: "green", marginBottom: 50}}>{ !isEditForm.isEditForm ? `${formData.name} Details Registered Successfully!` : `${formData.name} Details Updated Successfully!`}</div>
          <Button onClick={handleFormSubmitted} style={{ marginBottom: 50}} variant="success">
              Register New
          </Button>
      </>
        
      ) : (
      <Form  onSubmit={  handleFormSubmit}>
      <Form.Group controlId="name">

        <Form.Label>Cat Name:</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          isInvalid={catnameError}
        />
        {catnameError && <Form.Control.Feedback type="invalid">Please enter a cat name</Form.Control.Feedback>}
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Cat Description:</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          isInvalid={catdescriptionError}
        />
        {catdescriptionError && (
          <Form.Control.Feedback type="invalid">Please enter a cat description</Form.Control.Feedback>
        )}
      </Form.Group>
      {formError && <div style={{color: "red"}}>{formError}</div>}
          <br></br>
      <Button style={{ marginBottom: 50}} variant="primary" type="submit">
      { !isEditForm.isEditForm ? "Submit" : "Update"}
 
      </Button>
    </Form>
          )}  
    </>
  )
}




