"use client";

import { useState } from "react";
import { HiArrowRight } from 'react-icons/hi2';
import { SaraburiSpinner, SaraburiFormInput, SaraburiFormInputType } from "@/components";

export default function ContactForm() {

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await fetch(
        `https://server-singapore.scholarity.io/submit-contact-form?contactFormData=${encodeURIComponent(
          JSON.stringify(formData)
        )}`
      );

      if (response.status === 403) {
        const data = await response.json();
        setError(data.message);
      } else if (response.status === 200) {
        setSubmitted(true);
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="mt-8">
      {!submitted ? (
        <form id="contactForm" onSubmit={handleSubmit} className="flex flex-col gap-4">
          <SaraburiFormInput
            formInputType={SaraburiFormInputType.TEXT}
            labelName="Email"
            id="email"
            inputValue={formData.email}
            inputOnChange={handleChange}
          ></SaraburiFormInput>
          <SaraburiFormInput
            formInputType={SaraburiFormInputType.TEXT}
            labelName="Name"
            id="name"
            inputValue={formData.name}
            inputOnChange={handleChange}
          ></SaraburiFormInput>
          <SaraburiFormInput
            formInputType={SaraburiFormInputType.TEXTAREA}
            labelName="Message"
            id="message"
            inputValue={formData.message}
            inputOnChange={handleChange}
          ></SaraburiFormInput>

          {true && <p className="text-red-500">{error}</p>}
          {loading && <SaraburiSpinner />}

          {!loading && <button 
            type="submit" 
            className="w-32 rounded-full transition-colors inline-flex items-center justify-center hover:bg-[#000000c0] dark:hover:bg-[#ffffffc0] hover:border-transparent bg-foreground text-background text-sm pl-6 pr-4 h-10"
        >
          Submit
            <HiArrowRight className="w-6 h-6 pl-1"/>
        </button>}
        </form>
      ) : (
        <div id="contactFormSuccessMessage" className="text-green-600 text-center">
          <p>Thank you for your submission.</p>
        </div>
      )}
    </div>
  );
}