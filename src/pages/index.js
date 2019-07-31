import React from "react"
import { Link, graphql } from "gatsby"
import { useSpring, animated, config } from "react-spring";

import "../styles/bootstrap.min.css"

import bg from "../images/chain.jpg"

export default props => {

  const leftAnimation = useSpring({
    from: { transform: "translate3d(-50%,0,0)", opacity: 0 },
    to: { transform: "translate3d(0,0,0)", opacity: 1 },
    config: config.slow,
    delay: 50
  })

  const buttonAnimation = useSpring({
    from: { transform: "translate3d(0,100px,0)", opacity: 0 },
    to: { transform: "translate3d(0,0,0)", opacity: 1 },
    config: config.molasses,
    delay: 100
  })
  
  const imageAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.molasses,
    delay: 600
  })

  const brandAnimation = useSpring({
    from: { transform: "translate3d(0,50px,0)", opacity: 0 },
    to: { transform: "translate3d(0,0,0)", opacity: 1 },
    config: config.wobbly,
    delay: 700
  })

  const cardAnimation = useSpring({
    from: { transform: "translate3d(0,300px,0)", opacity: 0 },
    to: { transform: "translate3d(0,0,0)", opacity: 1 },
    config: config.molasses,
    delay: 800
  })

  return (
    <div className="container">
      <nav className="navbar navbar-dark bg-dark mt-3 sticky-top">
      <animated.a style={brandAnimation} className="navbar-brand" href="/">
        {props.data.site.siteMetadata.title}
      </animated.a>
      </nav>
      <div className="row align-items-center mt-4 mb-4">
        <div  className="col-lg-6">
          <animated.p className="m-4" style={leftAnimation}>{props.data.site.siteMetadata.description}</animated.p>
          <animated.button style={buttonAnimation} id="cta" type="button" className="btn btn-outline-dark ml-4">
            <Link to="/products">Check Our Products</Link>
          </animated.button>
        </div>
        <div className="col-lg-6">
          <animated.img style={imageAnimation} src={bg} alt="" width="100%" />
        </div>
      </div>
      <div className="row">
        {props.data.site.siteMetadata.features.map(f => (
          <animated.div key={f.id} style={cardAnimation} className="col-lg-6">
            <div className="card p-4 cc">
              <h2 className="card-title">{f.name}</h2>
              <p className="card-text">{f.description}</p>
            </div>
          </animated.div>
        ))}
      </div>
    </div>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        features {
          id
          name
          description
        }
      }
    }
  }
`
