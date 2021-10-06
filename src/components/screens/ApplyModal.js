import React from 'react';
import "./ApplyModal.css";

const ApplyModal = props => {

  if (!props.show) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted...");
  };


  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Apply</h4>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="apply_form">
            <label className="apply-label">Candidate Name</label><br />
            <input
              type="text"
              size="70"
              className="apply-input"
            /><br /><br />
            <label className="apply-label">Candidate email</label><br />
            <input
              type="email"
              className="apply-input"
              size="70"
              required
            />
            <br /><br />
            <label className="apply-label">Resume link</label><br />
            <input
              size="70"
              type="url"
              className="apply-input"
              required
            /><br /><br />
            <button className="modalsubmit-btn" type="submit">
              Submit
            </button>
            <br></br>
          </form>
        </div>
        <div className="modal-footer">
          <button onClick={props.onClose} className="close-btn">Close</button>
        </div>
      </div>
    </div>
  )
}

export default ApplyModal;