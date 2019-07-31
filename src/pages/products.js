import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import { Spring, config } from 'react-spring/renderprops'

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: this.props.data.allProductsJson.nodes,
      currentPage: 1,
      ItemsPerPage: 6,
      pageNumbers: null,
    }
    this.handleClickPagination = this.handleClickPagination.bind(this)
  }

  componentDidMount() {
    let numberOfPages = calcpagenumbers(
      this.state.products,
      this.state.ItemsPerPage
    )
    numberOfPages !== null &&
      this.setState({
        pageNumbers: numberOfPages,
      })
  }

  handleClickPagination(event) {
    this.setState({
      currentPage: Number(event.target.id),
    })
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }

  render() {
    const { products, currentPage, ItemsPerPage, pageNumbers } = this.state

    const indexOfLastItem = currentPage * ItemsPerPage
    const indexOfFirstItem = indexOfLastItem - ItemsPerPage
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)

    const renderContent = currentItems.map(product => {
      return (
        <Spring
          config={config.wobbly}
          from={{ 
            transform: "translate3d(0,30px,0)", 
            opacity: 0 
          }}
          to={{ 
            transform: "translate3d(0,0px,0)", 
            opacity: 1 
          }}>
          {props => (
            <div style={props} className="row mb-5" key={product.id} id="products">
              <img
                src={product.image}
                alt=""
                className="col-3"
              />
              <div className="col-9">
                <div className="row mb-3 mx-0 bg-secondary text-white">
                  <div className="col-9 mb-1 mt-1">{product.name}</div>
                  <div className="col-3 mb-1 mt-1 text-center">{product.price} $</div>
                </div>
                <div>{product.description}</div>
              </div>
            </div>
          )}
        </Spring>
        
      )
    })

    return (
      <div className="container">
        <div className="navbar bg-dark mt-3 mb-3 sticky-top text-white">
          <p className="mb-0">Products</p>
          <span>
            <p className="mb-0">Total of Products: {this.state.products.length}</p>
          </span>
        </div>
        
        {renderContent}

        <div className="row mb-4">
        <div className="col-10" id="pagination">
        {this.state.pageNumbers !== null &&
          this.state.pageNumbers.map(number => {
            return (
              <li
                key={number}
                id={number}
                className={number === this.state.currentPage ? "active" : ""}
                onClick={this.handleClickPagination}
              >
                {number}
              </li>
            )
          })}
        </div>
        <div className="col-2 text-center">
          <button className="btn btn-dark" id="back">
            <Link to="/">Go Back</Link>
          </button>
        </div>
        </div>
      </div>
    )
  }
}

export default Products

const calcpagenumbers = (items, itemsPerPage) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }
  return pageNumbers
}

export const query = graphql`
  query {
    allProductsJson {
      nodes {
        id
        name
        description
        image
        price
      }
    }
  }
`
