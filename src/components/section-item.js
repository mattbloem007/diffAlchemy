import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

class SectionItem extends React.Component {

    render() {
      let isImage = false;
      let ind = this.props.index + 1
      let classN = "wrapper spotlight style" + ind
      console.log("FILE", this.props.file)
      if (this.props.file.node.childImageSharp) {
        isImage = true;
      }
      if (ind % 2 == 0) {
        classN = "wrapper alt spotlight style" + ind
      }
        return (
          <section id="one" className={classN}>
            <div className="inner">
              <div className="image">
                {isImage? <Img fluid={this.props.file.node.childImageSharp.fluid}/> : null}
                <Link
                    to={this.props.data.node.slug}
                    title={this.props.data.node.title}
                    aria-label={this.props.data.node.title}
                    className="overlay-link"
                    style={{ opacity: 0 }}
                >
                </Link>
              </div>
              <div className="content">
                <h2 className="major">{this.props.data.node.title}</h2>
                <div  dangerouslySetInnerHTML={{
                    __html: this.props.data.node.excerpt
                }} />
                <a href={"/" + this.props.data.node.slug} className="special">
                  Learn more
                </a>
              </div>
            </div>
          </section>
        )
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
              items.push(<SectionItem key={e.node.id} data={e} file={fileIndex} index={i}/>);
            }

      });
    }
    return <section id="wrapper">{items}</section>;
}
