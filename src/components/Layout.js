import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import ContextProvider from '../provider/ContextProvider'

import '../assets/sass/main.scss';
import Footer from './Footer';
import SideBar from './Sidebar';
import Mailing from './mailing'
import Navigation from './Navigation'


class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPreloaded: true,
    };
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({ isPreloaded: false });
    }, 100);
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  render() {
    const { children, fullMenu } = this.props;
    const { isPreloaded } = this.state;
    return (
    <ContextProvider>

      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'description', content: 'Solid State' },
                { name: 'keywords', content: 'site, web' },
              ]}
            >
              <html lang="en" />
            </Helmet>
            <div
              className={isPreloaded ? ' main-body  is-preload' : ' main-body'}
            >
              <div id="page-wrapper">
                <Navigation siteTitle={data.site.siteMetadata.title}/>
                {children}
                <Mailing />
              </div>
            </div>
          </>

        )}
      />
      </ContextProvider>

    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
