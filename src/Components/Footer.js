import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="index-container">
        <p className="contact-info">Contact Information:</p>
        <p className="contact-info ml-3 ml-md-0"><a href="mailto:kbrumm@uw.edu"><span
              className="material-icons">email</span>kbrumm@uw.edu</a></p>
        <p className="contact-info ml-3 ml-md-0"><a href="mailto:erikca28@uw.edu"><span
              className="material-icons">email</span>erikca@uw.edu</a></p>
        <p className="contact-info ml-3 ml-md-0"><a href="mailto:sunx28@uw.edu"><span
              className="material-icons">email</span>sunx28@uw.edu</a></p>

        <p className="copyright mt-2 mt-md-1">&copy; University of Washington INFO 340, Fall 2021</p>
      </div>
    </footer>
  );
}