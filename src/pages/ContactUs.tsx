import Contact, { ContactForm, ContactHeading, SocialDivs, SocialIcons } from '../components/Contact/Contact'
import useIsMobile from '../hooks/useIsMobile';
import './../css/contactus.css';
import '../components/Contact/contact.css'

export default function ContactUs() {

  const isMobile = useIsMobile();

  if(isMobile){
    return (
      <div className="contact-us-page-container-mobile">
        <div className="contact-us-page-box-mobile">

                <div className="contact-form-mobile">
                  <ContactHeading />
                  <ContactForm />
                </div>
                <div className="social-container-mobile">
                <SocialDivs />
                <SocialIcons /> 
                </div>
                {/* <div className="contact-mobile-line">
                  <img src="/landing_line.png" alt="" />
                  </div> */}

                  </div>
              </div>

    )
  }

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
