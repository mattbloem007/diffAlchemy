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
      isOpen: true
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

    return (
        <div className={`${this.state.isOpen ? 'is-menu-visible' : ' '}`}>
          <MailingForm onMenuToggle={() => {
            if (this.state.isOpen) {
              this.handleClose()
            }
            else {
              this.handleOpen()
            }
          }} />
        </div>
    );
  }

}

export default Mailing;
