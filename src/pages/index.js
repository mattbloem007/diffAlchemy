import React from 'react';

import Layout from '../components/Layout';
import alc from '../assets/img/Alchemy of Remembrance Logo.png';


import BlogList from "../components/list-blog";
import SectionListAndImages from "../components/sections"


import config from '../../config';
const IndexPage = () => (
  <Layout>
    <section id="banner">
      <div className="inner">
        <div className="logo">
        <div className="col-2"><span className="image left"><img src={alc} alt="" /></span>
        <h2>{config.heading}</h2>
        <p>Living to create, learn, and explore the truth.
          <br/>
          <br />
          Are you ready to REMEMBER the truth of who you ARE?
        </p>
        </div>
        </div>

        <a href="#wrapper" className="button"> Scroll down for the tools of Remembrance</a>
        <div className="containArrows">
        <div className="arrow arrow-first"></div>
        <div className="arrow arrow-second"></div>
        </div>

      </div>

    </section>
    <SectionListAndImages />
    <BlogList />
  </Layout>
);

export default IndexPage;
