import Script from 'next/script'
import React, { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState({
    name: "",
    email: "",
    "g-recaptcha-response": ""
  });
  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const formSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(query).forEach(([key, value]) => {
      formData.append(key, value);
    });
    // ADD Getform.io Endpoint
    fetch("{YOUR-GETFORM-ENDPOINT}", {
      method: "POST",
      body: formData
    }).then(() => setQuery({ name: "", email: ""}));
  };

  return (
    <>
      <Script
        // Add your reCAPTCHA site key
        src="https://www.google.com/recaptcha/api.js?render=6LfKA9UiAAAAAD1_G8rPZY-hP9Um91a6QNrXkUwH"
        onReady={() => {
          grecaptcha.ready(function() {
            // Add your reCAPTCHA site key
            grecaptcha.execute('6LfKA9UiAAAAAD1_G8rPZY-hP9Um91a6QNrXkUwH', {action: 'homepage'})
            .then(function(token) {
              setQuery({'g-recaptcha-response': token})
            });
          });
        }}
      />
      <form onSubmit={formSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={query.email} onChange={handleParam()}/>
        </div>
        <div>
          <label htmlFor="name">Your name:</label>
          <input type="text" id="name" name="name" value={query.name} onChange={handleParam()} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
