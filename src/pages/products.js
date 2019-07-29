import React, { Component } from "react"
import { Link, graphql } from "gatsby"

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
        <div key={product.id}>
          <img
            src={product.image}
            alt=""
            style={{ width: 400, height: "auto" }}
          />
          <h3>
            {product.name}
            <span>{product.price}</span>
          </h3>
          <div>{product.description}</div>
        </div>
      )
    })

    return (
      <div>
        <h1>Products</h1>
        <h3>Total of Products: {this.state.products.length}</h3>
        {renderContent}

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
        <Link to="/">Go Back</Link>
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
