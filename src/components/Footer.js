import React from 'react';
import config from '../../config';
import emailjs from 'emailjs-com';

import Mailing from './mailing'

var divStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around"
};

var soc = {
  marginTop: "5rem",
  justifyContent: "center",
  display: "flex"
}

var link = {
  textAlign: "center",
    height: "3rem",
    width: "3rem",
    background: "hsla(225, 7%, 3%,1)",
    borderRadius: "100%",
    lineHeight: "3rem",
    color: "hsla(0,0%,100%,1)",
    marginLeft: ".5rem",
    marginRight: ".5rem"
}


class Footer extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          submitDisabled: false
      };

      this.textAreaInput = this.textAreaInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  textAreaInput(event) {
      event.target.style.height = "auto";
      event.target.style.height = event.target.scrollHeight + "px";
  }

  handleSubmit(event) {
      event.preventDefault();
      if (!this.state.submitDisabled) {
          this.setState({
              submitDisabled: true
          });

          let name = encodeURI(this.dataName.value),
              email = encodeURI(this.dataEmail.value),
              message = encodeURI(this.dataMessage.value),
              body = `name=${name}&email=${email}&message=${message}`;
              console.log(body)

              var template_params = {
                 "reply_to": email,
                 "from_name": name,
                 "to_name": "Matthew Gabriel",
                 "message_html": message
              }

              var service_id = "default_service";
              var template_id = "template_m9OkeQLI";
              var user_id = "user_wLPGPl2w2ETFdTUDNZQP2";
              emailjs.send(service_id, template_id, template_params, user_id);
      }
    }

  render() {
    return (
      <section id="footer" style={divStyle}>
      <Mailing/>
          {/**<h2 className="major">Get in touch</h2>
          <p>
            Contact Matthew Gabriel here. Ask your questions for the podcast, send an amazing experience to share, or just get in touch
          </p>
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
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                    style={{ overflowY: "hidden" }}
                    ref={c =>
                        (this.dataMessage = c)
                    }
                    className="field-box"
                    onChange={this.textAreaInput}
                    name="message"
                    id="message"
                    required
                />
              </div>
            </div>
            <ul className="actions">
              <li>
              <button
                  className="button icon fa-envelope-o"
                  onClick={this.handleSubmit}
                  id="submit"
                  ref={c => (this.btn = c)}
              > Send Message</button>
              </li>
            </ul>
          </form>*/}
          <div style={soc}>
          {config.socialLinks.map(social => {
            const { icon, url } = social;
            return (
              <a target="_blank" href={url} style={link}>
                <i className={`fa ${icon}`} />
              </a>
            );
          })}
          </div>
          <div className="inner">

          <ul className="copyright">
            <li>&copy; The Alchemy of Remembrance. All rights reserved.</li>
          </ul>
        </div>
      </section>
    );
  }

}

export default Footer;
