import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

class PodcastItem extends React.Component {

    render() {
      let isImage = false;
      console.log("FILE", this.props.file)
      if (this.props.file.node.childImageSharp) {
        isImage = true;
      }
      let ex = this.props.data.node.excerpt.indexOf("<p class=");
      let newEx = this.props.data.node.excerpt.slice(0, ex);
        return (
          <article>
            <div className="image">
              {isImage? <Img fluid={this.props.file.node.childImageSharp.fluid}/> : null}
              <Link
                  to={this.props.data.node.slug}
                  title={this.props.data.node.title}
                  aria-label={this.props.data.node.title}
                  className="overlay-link"
                  style={{ opacity: 0 }}
              >
                  {this.props.data.node.title}
              </Link>
            </div>
            <h3 className="major">{this.props.data.node.title}</h3>
            <div  dangerouslySetInnerHTML={{
                __html: newEx
            }}>

            </div>
            <Link
                to={this.props.data.node.slug}
                title={this.props.data.node.title}
                aria-label={this.props.data.node.title}
                className="special"
            >
                Learn More
            </Link>
          </article>
        );
    }
}

export default function(props) {
    console.log(props.data)
    let items = [];
    let fileIndex;
    if (props.data.wpgraphql.posts.edges != undefined) {
      const data = props.data.wpgraphql.posts.edges;
      data.forEach(function(e, i) {
          if (props.remove && e.node.id === props.remove) return;
            fileIndex = props.data.allFile.edges.find(({node}) => {
              if (node.parent) {
                console.log(node.parent.id)
                if (node.parent.id == "SitePage /" + e.node.slug) {
                  return node
                }
              }
            })
            console.log(fileIndex)
            if (fileIndex) {
              items.push(<PodcastItem key={e.node.id} data={e} file={fileIndex}/>);
            }

      });
    }
    return <section className="features">{items}</section>;
}
