import { useState } from "react";
import emailjs from '@emailjs/browser';
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Contact() {

    // State variable for the form inputs
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    // State variable for the error message
    const [errorMessage, setErrorMessage] = useState("");
    // State variable for the success message
    const [successMessage, setSuccessMessage] = useState("");


    // Function to handle the change on the form inputs
    const handleInputChange = (e) => {

        // Deconstructs the event target to get the id and value from the input field
        const { id, value } = e.target;
        // Updates the form
        setForm({ ...form, [id]: value });
    }

    // Function to handle the submit of the form
    const handleSubmit = async (e) => {
        // Prevents default form submission behavior
        e.preventDefault();
        // Clears any previous error message
        setErrorMessage('');

        // Ensures the email is valid
        if (!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(form.email)) {
            setErrorMessage('Invalid email');
            return;
        }

        // Ensures the form contains a name
        if (!form.name) {
            setErrorMessage('Please make sure to write your name');
            return;
        }

        // Ensures the form conatains an email
        if (!form.email) {
            setErrorMessage('Please make sure to write your email');
            return;
        }

        // Ensures the form contains a message
        if (!form.message) {
            setErrorMessage('Please make sure to write your message');
            return;
        }

        // Checks that the environmental variables are available
        if (!import.meta.env.VITE_APP_EMAILJS_SERVICE_ID || 
            !import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID || 
            !import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY) {
            setErrorMessage('Missing email configuration. Please try again later.');
            return;
        }

        try {
            // Sends the message
            await emailjs.send(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.name,
                    to_name: "Fabricio",
                    to_email: 'guacutofabricio@gmail.com',
                    message: form.message
                },
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
            )

            console.log('Submitted!!');
            // Clears the form
            setForm({ name: '', email: '', message: '' });
            // Sets the success message
            setSuccessMessage('Your message has been sent successfully!');
        } catch (error) {
            console.log(error);
            // Sets the error message
            setErrorMessage('Unexpected error sending message');
        }
    }


    return (<>
        <Header title={"Contact"} />
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>

                <div className='form-group'>
                    <label className="form-label" htmlFor="name" >Name:</label>
                    <input type="text" className="input-field" value={form.name} onChange={handleInputChange} id='name' />
                </div>

                <div className='form-group'>
                    <label className="form-label" htmlFor="email" >Email address:</label>
                    <input type="text" className="input-field" value={form.email} onChange={handleInputChange} id='email' />
                </div>

                <div className='form-group'>
                    <label className="form-label" htmlFor="message" >Message:</label>
                    <textarea className="input-field" value={form.message} onChange={handleInputChange} id="message" rows="4"></textarea>
                </div>

                {errorMessage && <div className='error-message'><h4>{errorMessage}</h4></div>}
                {successMessage && <div className='success-message'><h4>{successMessage}</h4></div>}

                <button className="submit-button" type="submit" >Submit</button>

            </form>
        </div>
        <Footer />
    </>)
};