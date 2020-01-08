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
        <div className="col-2"><span className="image left"><img src={alc} alt="" /></span></div>
        </div>
        <h2>{config.heading}</h2>
        <p>{config.subHeading}</p>
        <p>Living to create, learn, and explore the truth.</p>
      </div>
    </section>
    <SectionListAndImages />
    <BlogList />
  </Layout>
);

export default IndexPage;
