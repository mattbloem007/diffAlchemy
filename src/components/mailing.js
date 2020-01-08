import React, { useState } from 'react';
import MailingForm from './mailingForm';
import { Link } from 'gatsby';

const timeoutLength = 10;





class Mailing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     isOpen: true,
   }
  }

  handleOpen = () => {

    this.setState({
      isOpen: false
    });

    this.timeout = setTimeout(() => {
      //No need to repeat yourself - use the existing method here
      this.handleClose();
    }, timeoutLength)
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    });
    clearTimeout(this.timeout)
  };

  render() {

    var divStyle = {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      justifyContent: "center"
    };

    var item = {
      alignSelf: "center"
    }

    var form = {
      display: "block",
      width: "100%",
      height: "calc(1.5em + 0.75rem + 2px)",
      padding: "0.375rem 0.75rem",
      fontSize: "1rem",
      alignSelf: "center",
      fontWeight: "400",
      lineHeight: "1.5",
      color: "#495057",
      backgroundColor: "#fff",
      backgroundClip: "padding-box",
      border: "1px solid #ced4da",
      borderRadius: "0.25rem",
      transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"
    }

    // return (
    //     <div className={`${this.state.isOpen ? 'is-menu-visible' : ' '}`}>
    //       <MailingForm onMenuToggle={() => {
    //         if (this.state.isOpen) {
    //           this.handleClose()
    //         }
    //         else {
    //           this.handleOpen()
    //         }
    //       }} />
    //     </div>
    // );

    return (
      <section id="signup">
          <div style={divStyle}>
            <div style={item}>
              <div style={divStyle}>
                <div style={item}>
                  <i className="fa fa-paper-plane text-white"></i>
                </div>
              </div>
              <h2 className="text-white mb-5 item">Subscribe to receive updates!</h2>
              <form className="form-inline d-flex item">
                <input type="email" style={form} id="inputEmail" placeholder="Enter email address..." />
                <br/>
                <button type="submit" className="button icon fa-envelope-o">Subscribe</button>
              </form>
            </div>
            </div>
      </section>
    )
  }

}

export default Mailing;
