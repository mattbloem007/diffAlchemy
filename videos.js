import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";


export default function({ data }){
    const videos = data.ytPlaylist.childrenYtVideo;

    return (
      <Layout fullMenu>
      <section id="wrapper">
      <header>
        <div className="inner">
          <h2>Videos</h2>
        </div>
      </header>
      <div className="wrapper">
        <div className="videoContainer">
        {videos.map(video =>
          <div className="videos">
            <h3>{video.title}</h3>
            <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + video.id} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        )}
        </div>
        </div>
        </section>
      </Layout>
)
}


export const query = graphql`
  query LwypPlaylist {
    ytPlaylist(id: { eq: "lwypPlaylist" }) {
      childrenYtVideo {
        id
        title
        description
      }
    }
  }`
