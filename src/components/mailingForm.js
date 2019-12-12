import React from 'react';
import { Link } from 'gatsby';
import addToMailchimp from 'gatsby-plugin-mailchimp'


export default class MailingForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
        submitDisabled: false
    };
  }

  handleSubmit(event) {
      event.preventDefault();
      if (!this.state.submitDisabled) {
          this.setState({
              submitDisabled: true
          });

          let name = encodeURI(this.dataName.value),
              email = encodeURI(this.dataEmail.value)

              console.log(name, " ", email)

              addToMailchimp(email, {FNAME: name})
    .then(data => {
      console.log(data)
    })
    .catch(() => {
    })
      }
    }

  render() {
    return (
      <nav id="menu">
        <div className="inner">
          <h2>Sign Up for the Mailing List</h2>
          <form method="post">
            <div className="fields">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    ref={c => (this.dataName = c)}
                    className="field-box"
                    name="name"
                    id="name"
                    required
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    ref={c => (this.dataEmail = c)}
                    className="field-box"
                    name="email"
                    id="email"
                    required
                />
              </div>
            </div>
            <ul className="actions">
              <li>
              <button
                  className="button icon fa-envelope-o"
                  onClick={e => {
                    e.preventDefault();
                    this.handleSubmit(e);
                    this.props.onMenuToggle();
                  }}
                  id="submit"
                  ref={c => (this.btn = c)}
              > Sign Me Up!</button>
              </li>
            </ul>
          </form>
          <a
            className="close"
            onClick={e => {
              e.preventDefault();
              this.props.onMenuToggle()
            }}
            href="#menu"
          >
            {''}
          </a>
        </div>
      </nav>
    );
  }

}
