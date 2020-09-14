import React, { useState, useEffect } from 'react';
import * as yup from "yup";
import axios from 'axios';


const Form = (props) => {

   

    const [formState, setFormState] = useState({
                name: "",
                pizzaSize: "",
                pizzaSauce: "",
                pepperoni: false,
                onions: false,
                sausage: false,
                olives: false,
                instructions:"",
    });
    const [errors, setErrors] = useState({ 
                name: "",
                pizzaSize: "",
                pizzaSauce: "",
                pepperoni: false,
                onions: false,
                sausage: false,
                olives: false,
                instructions:"",
     });
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [newForm, setNewForm] = React.useState([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => setButtonDisabled(!valid));
      }, [formState]);
    
      const formSubmit = e => {
        e.preventDefault();
        axios.post("https://reqres.in/api/users", formState)
        .then(res => {
            setNewForm(res.data);
            console.log("It works!", newForm)
            setFormState({
                name: "",
                pizzaSize: "",
                pizzaSauce: "",
                pepperoni: false,
                onions: false,
                sausage: false,
                olives: false,
                instructions:"",
            });   
        })
        .catch(err => console.log(err.response));
    }


      let formSchema = yup.object().shape({
        name: yup.string().required("Please Provide Your Name").min(2),
        pizzaSize: yup.string().required("Please Select Your Size"),
        pizzaSauce: yup.string().required("Must Select Sauce"),
        pepperoni: yup.boolean().optional(),
        sausage: yup.boolean().optional(),
        onions: yup.boolean().optional(),
        olives: yup.boolean().optional(),
        instructions: yup.string().optional("Instructions are Optional")
    })
    
      const validateChange = e => {
        e.persist();
        yup
          .reach(formSchema, e.target.name)
          .validate(e.target.value)
          .then(() =>
            setErrors({
              ...errors,
              [e.target.name]: ""
            })
          )
          .catch(error =>
            setErrors({
              ...errors,
              [e.target.name]: error.errors[0]
            })
          );
      };

      
      const inputChange = e => {
        const value =
          e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormState({
          ...formState,
          [e.target.name]: value
        });
        validateChange(e);
      };

    return (
        <form onSubmit={formSubmit} className="formDiv">
            <h3>Build Your Own Pizza:</h3>
            <label htmlFor="name">
                <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Please Enter Name Here"
                    onChange={inputChange}
                    value={formState.name}
                    errors={errors}
                />
                {errors.name.length > 0 ? <p className='error'>{errors.name}</p> : null}
            </label>
            <br />
            <label htmlFor="pizzaSize">
                Choice Of Size
                <select name="pizzaSize" onChange={inputChange}>
                    <option value="personal">Personal</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
                {errors.pizzaSize.length > 0 ? <p className='error'>{errors.pizzaSize}</p> : null}
            </label>

            

            <label htmlFor="pizzaSauce">
                Choice of Sauce
                <select name="pizzaSauce" onChange={inputChange}>
                    <option value="original">Original Red</option>
                    <option value="bbq">BBQ Sauce</option>
                    <option value="garlic">Garlic Ranch</option>
                    <option value="alfredo">Spinach Alfredo</option>
                </select>
                {errors.pizzaSauce.length > 0 ? <p className='error'>{errors.pizzaSauce}</p> : null}
            </label>


            <div className="toppingDiv">
                <h3>Add Toppings</h3>
                <label htmlFor="pepperoni">
                Pepperoni
                <input onChange={inputChange} 
                    name="pepperoni"
                    type="checkbox"
                    value="pepperoni"
                />
            </label>
            <label htmlFor="sausage">
                sausage
                <input onChange={inputChange} 
                    name="sausage"
                    type="checkbox"
                    value="sausage"
                />
            </label>
            <label htmlFor="onions">
                Onions
                    <input onChange={inputChange} 
                    name="onions" 
                    value="onions" 
                    type="checkbox"/>
            </label>
            <label htmlFor="olives">
                Olives
                    <input onChange={inputChange} 
                    name="olives" 
                    value="olives" 
                    type="checkbox"/>
            </label>
    
            
            </div>

            <label htmlFor="instructions">
                Special Instructions
                <input 
                    id="instructions"
                    type="text"
                    name="instructions"
                    placeholder="type here"
                    onChange={inputChange}
                    value={formState.instructions}
                />
            </label>
            <br />
            <button disabled={buttonDisabled}>Submit</button>

        </form>

    )

}

export default Form;