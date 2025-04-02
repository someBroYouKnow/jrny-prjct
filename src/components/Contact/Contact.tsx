import './contact.css'

export default function Contact() {
  return (
    <>
    <div className="contact-us-container">
        <div className="contact-us-heading">
              Let’s shape your <span className='jrny-span'>JRNY</span> into something unforgettable.
        </div>
    <div className="contactUsLine"><img src="contact_line.png" /> </div>
            <div className="contact-us-box">
              <div className="contact-form">
                <div className="your-info">
                <div className="footer-input-div">

                <input placeholder='Name' type="text" className="footer-input" />
                </div>
                <div className="footer-input-div">

                <input placeholder='Email' type="email" className="footer-input" />
                </div>
                </div>
                <div className="footer-input-div footer-textarea">
                <textarea placeholder='Message' className="footer-input form-textarea" />
                </div>
                <button className="send-mail button button-alt">Send Mail</button>
              </div>
              <div className="socials-container">
                <div className="social-icons">
                  <img src="favicon/whatsapp.png" alt="whatsapp" />
                  <img src="favicon/linkedin.png" alt="linkedin" />
                  <img src="favicon/instagram.png" alt="instagram" />
                  <img src="favicon/facebook.png" alt="facebook" />
                </div>
                <div className="social-divs">
                  <div className="social-div-container">
                    <div className="social-heading">Email</div>
                    <div className="social-example">
                      kiminonawa@example.com
                    </div>
                  </div>
                  <div className="social-div-container"> 
                    <div className="social-heading">Phone</div>
                    <div className="social-example">
                      kiminonawa@example.com
                    </div>
                  </div>
                  <div className="social-div-container"> 
                    <div className="social-heading">Location</div>
                    <div className="social-example">
                      <span>Mumbai</span><span>Delhi</span>Indore<span></span>

                    </div>
                  </div>
                  <div className="social-div-container"> 
                    <div className="social-heading">Services</div>
                    <div className="social-example">
                      kiminonawa@example.com
                    </div>
                  </div>
                </div>
              </div>
            </div>

            </div>
    </>
  )
}
