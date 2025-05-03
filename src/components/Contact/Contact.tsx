import useIsMobile from "../../hooks/useIsMobile";
import "./contact.css";

export default function Contact() {
  const isMobile = useIsMobile();
console.log(isMobile)
  if (isMobile) {
    return (
      <div className="contact-us-container">
        <div className="social-container-mobile">
        <SocialDivs />
        <SocialIcons />
        </div>
        <div className="contact-mobile-line">
          <img src="/landing_line.png" alt="" />
        </div>
        <div className="contact-form-mobile">
          <ContactHeading />
          <ContactForm />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="contact-us-container">
        <div className="contact-us-row">
        < ContactHeading />
        <SocialIcons />
        </div>
        <div className="contactUsLine">
          <img src="/contact_line.png" />{" "}
        </div>
        <div className="contact-us-box">
          <ContactForm />
          <div className="socials-container">
            <SocialDivs />
          </div>
        </div>
      </div>
    </>
  );
}

export const ContactHeading = ()=>{
  return (
    <div className="contact-us-heading">
    Let’s shape your <span className="jrny-span-text-contact-us">JRNY</span> into
    something unforgettable.
  </div>
  )
}

export const ContactForm = () =>{
  return (
    <div className="contact-form">
    <div className="your-info">
      <div className="footer-input-div">
        <input
          placeholder="Name"
          type="text"
          className="footer-input"
        />
      </div>
      <div className="footer-input-div">
        <input
          placeholder="Email"
          type="email"
          className="footer-input"
        />
      </div>
    </div>
    <div className="footer-input-div footer-textarea">
      <textarea
        placeholder="Message"
        className="footer-input form-textarea"
      />
    </div>
    <button className="send-mail button button-alt">
      <span className="send-mail-text">Send Mail</span>
      <img style={{marginLeft: "5px"}} src="/right-arrow.png" />
    </button>
  </div>
  )
}

export const SocialIcons = () =>{
  return (
    <div className="social-icons">
    <img src="/favicon/whatsapp.svg" alt="whatsapp" />
    <img src="/favicon/linkedin.svg" alt="linkedin" />
    <img src="/favicon/instagram.svg" alt="instagram" />
    <img src="/favicon/facebook.svg" alt="facebook" />
  </div>
  )
}

export const SocialDivs = ()=>{
  const isMobile = useIsMobile();
  return (
    <div className={  `${isMobile?"social-divs-mobile":"social-divs"}`  }>
    <div className="social-div-container">
      <div className="social-heading">Email</div>
      <div className="social-example">kiminonawa@example.com</div>
    </div>
    <div className="social-div-container">
      <div className="social-heading">Phone</div>
      <div className="social-example">kiminonawa@example.com</div>
    </div>
    <div className="social-div-container">
      <div className="social-heading">Location</div>
      <div className="social-example">
        <span>Mumbai</span>
        <span>Delhi</span>Indore<span></span>
      </div>
    </div>
    <div className="social-div-container">
      <div className="social-heading">Services</div>
      <div className="social-example">kiminonawa@example.com</div>
    </div>
  </div>
  )
}