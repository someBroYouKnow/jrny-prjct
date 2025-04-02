import Contact from '../components/Contact/Contact'
import './../css/contactus.css';

export default function ContactUs() {
  return (
    <>
      <div className="contact-us-page-container">
        <div className="contact-heading">
          <span className="contactus-span">Contact Us</span>
          <span className="line"></span>
          <span className="create-jrny-contact">Create a JRNY</span>
          <span className="line"></span>
        </div>
        <div className="contact-us-page-box">
          <Contact />
        </div>
      </div>

    </>
  )
}
