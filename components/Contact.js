import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(''); // 'success', 'error', 'submitting'

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('itsme.kevin@icloud.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    // In a real application, you would send this data to an API endpoint
    // For demonstration, we'll just show an alert
    alert(`Form Submitted!
    Name: ${formData.name}
    Email: ${formData.email}
    Message: ${formData.message}`);

    setFormStatus('success');
    setFormData({ name: '', email: '', message: '' }); // Clear form
    setTimeout(() => setFormStatus(''), 3000);
  };

  return (
    <section id="contact" className="bg-gray-900 py-16 px-4 text-white dark:bg-gray-800">
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto text-center bg-gray-800 p-8 rounded-lg shadow-xl dark:bg-gray-900"
      >
        <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
        <p className="text-lg mb-8 text-gray-300">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>

        {/* Email Copy Section */}
        <div className="flex items-center justify-center mb-12">
          <p className="text-xl">Email: <a href="mailto:itsme@sfai.im" className="text-blue-400 hover:underline mr-2">itsme@sfai.im</a></p>
          <button
            onClick={handleCopyEmail}
            className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 text-sm"
            aria-label="Copy email address"
          >
            {copied ? 'Copied!' : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m-4 3H9m1.5-6.5v6.5m1-11v4m-4 4h7.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mini Email Form */}
        <h3 className="text-3xl font-bold mb-6">Send a Message</h3>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-400"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={formStatus === 'submitting'}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
          {formStatus === 'success' && (
            <p className="text-green-400 mt-2">Message sent successfully!</p>
          )}
          {formStatus === 'error' && (
            <p className="text-red-400 mt-2">Failed to send message. Please try again.</p>
          )}
        </form>

        <div className="flex justify-center space-x-6 mt-6">
          <a
            href="https://github.com/zankke"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full flex items-center transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.111.82-.261.82-.578 0-.285-.011-1.231-.016-2.235-3.338.726-4.042-1.607-4.042-1.607-.546-1.388-1.333-1.757-1.333-1.757-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.419-1.303.762-1.603-2.665-.304-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.008-.404c1.02.005 2.048.138 3.008.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.874.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.625-5.479 5.921.431.372.814 1.102.814 2.222 0 1.604-.014 2.896-.014 3.289 0 .32.218.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/your-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full flex items-center transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 0h-14c-2.761 0-5 2.238-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.762-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.269c-.966 0-1.75-.783-1.75-1.75s.784-1.75 1.75-1.75 1.75.783 1.75 1.75-.783 1.75-1.75 1.75zm13.5 11.269h-3v-5.604c0-1.336-.025-3.058-1.865-3.058-1.867 0-2.154 1.459-2.154 2.966v5.696h-3v-10h2.885v1.366h.041c.402-.764 1.386-1.566 2.852-1.566 3.05 0 3.615 2.007 3.615 4.617v5.583z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  );
}
