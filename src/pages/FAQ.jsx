import React, { useState } from 'react';
import SEO from '../components/SEO';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQ.css';

const faqs = [
  {
    question: "How do I place an order?",
    answer: "Placing an order is easy! Browse our collection, click 'Add to Cart' on the books you want, and proceed to checkout by clicking the cart icon in the top right corner."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship globally! Shipping costs and delivery times vary depending on the destination. You can see the exact shipping cost during checkout before confirming your order."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 30 days of delivery for physical books in their original, unused condition. Digital downloads and eBooks are non-refundable."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you will receive a confirmation email with a tracking number and a link to track your package."
  },
  {
    question: "Are your payments secure?",
    answer: "Absolutely. We use industry-standard encryption protocols and trusted payment gateways to ensure that all your personal and financial information remains secure."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page container">
      <SEO 
        title="Frequently Asked Questions" 
        description="Find answers to common questions about Book Hub orders, shipping, and returns." 
      />
      
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Can't find the answer you're looking for? Reach out to our customer support team.</p>
      </div>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${openIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            {openIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
