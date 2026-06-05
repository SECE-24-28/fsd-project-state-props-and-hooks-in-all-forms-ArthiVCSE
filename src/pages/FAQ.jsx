import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HelpIcon from '@mui/icons-material/Help';

const faqs = [
  { q:'How to apply for admission?',  a:'Students can apply through the online application form available on the university portal.' },
  { q:'How to check attendance?',     a:'Login to the student dashboard using your university credentials to view attendance details.' },
  { q:'How to contact faculty?',      a:'Faculty contact details are available in the faculties page and department portal.' },
  { q:'How to reset password?',       a:'Use the "Forgot Password" option available on the login page.' },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message={<span className="d-flex align-items-center justify-content-center gap-2"><HelpIcon fontSize="small"/> Frequently Asked Questions</span>} />
      <Navbar />
      <div className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow border-0 rounded-4 p-4">
              <h2 className="text-center mb-4">FAQ</h2>
              <div className="accordion">
                {faqs.map(({ q, a }, i) => (
                  <div className="accordion-item mb-3 border rounded-3" key={i}>
                    <h2 className="accordion-header">
                      <button className={`accordion-button ${open !== i ? 'collapsed' : ''}`}
                        type="button" onClick={() => setOpen(open === i ? -1 : i)}>
                        {q}
                      </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${open === i ? 'show' : ''}`}>
                      <div className="accordion-body">{a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FAQ;