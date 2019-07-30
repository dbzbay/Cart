import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import FlexView from 'react-flexview'
import CartItems from "./CartItems.jsx"
import CartTotal from "./CartTotal.jsx"

export default class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cartQty: 0,
      cartTotal: 0,
      //sample cart data for testing
      cart: [{"_id":"09000100","name":"Intelligent Soft Tuna","price":999,"image1":"http://lorempixel.com/640/480/cats","seller":"Wehner, Howell and Senger","condition":"Sleek","category":"Jewelery","__v":0, "qty":3},
      {"_id":"09900100","name":"Generic Plastic Keyboard","price":873,"image1":"http://lorempixel.com/640/480/cats","seller":"Satterfield, Stark and Bauch","condition":"Refined","category":"Automotive","__v":0, "qty":3}] 
    }

    this.getItem = this.getItem.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.totalCart = this.totalCart.bind(this)
    this.goToItem = this.goToItem.bind(this)
    this.changeQty = this.changeQty.bind(this)
  }

  goToItem(item_id, event) {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent('productChanged', {
      detail: {
        id: item_id
      }
    }));
    window.dispatchEvent(new CustomEvent('showCart', {
        detail: {
          showCart: false
        }
      })
    );
  }

  changeQty(ind, newQty) {
    let cartCopy = [...this.state.cart]
    
    if (newQty === 0) {
      cartCopy.splice(ind,1)
    } else {
      cartCopy[ind].qty = newQty
    }

    this.setState({cart: cartCopy}, () => {this.totalCart()})
  }

  //totals qty and prices of items in cart and updates them in state
  totalCart() {
    let total = 0
    let qty = 0
    for (let i=0; i<this.state.cart.length; i++) {
      total += this.state.cart[i].price * this.state.cart[i].qty
      qty += this.state.cart[i].qty
    }

    total = total.toFixed(2)

    this.setState({
      cartQty: qty,
      cartTotal: total
    })

    window.dispatchEvent(
      new CustomEvent('updateQty', {
        detail: {
          totalQty: qty
        }
      })
    );

  }

  addToCart(item) {
    let cartCopy = [...this.state.cart]
    let itemInd = undefined
    
    //search if item already exists in cart array and track index of if so
    for (let i=0; i<cartCopy.length; i++) {
      if (item._id === cartCopy[i]._id) {
        itemInd = i
      }
    }

    //add quantity if item already exists in cart, push item if it doesn't
    if (itemInd) {
      cartCopy[itemInd].qty += item.qty
    } else {
      cartCopy.push(item)
    }

    //set cart to new array and then run totalCart to update the totals
    this.setState({cart: cartCopy}, () => {this.totalCart()})
  }

  getItem(id, cb) {
    axios.get(`http://ec2-3-16-22-38.us-east-2.compute.amazonaws.com:3099/item:?id=${id}`)
    .then(data => {
      cb(null, data.data) 
      // this.setState({ testItem: data.data });
    });
  }
 
  componentDidMount() {
    //event listener for if an item is bought
    window.addEventListener('itemBought', event => {
      let getPromise = new Promise((resolve, reject) => {
        this.getItem(event.detail.id, (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        })
      })
  
      getPromise.then((item) => {
        item.qty = parseInt(event.detail.qty)
        this.addToCart(item)
      })
    })
    
    //test event for testing functionality; will delete below once we've integrated services
    // let event = {detail: {
    //   id: 'CKO986x',
    //   qty: 4
    // }}

    // new Promise((resolve, reject) => {
    //   this.getItem(event.detail.id, (error, result) => {
    //     if (error) {
    //       reject(error)
    //     } else {
    //       resolve(result)
    //     }
    //   })
    // })
    // .then((item) => {
    //   item.qty = event.detail.qty
    //   this.addToCart(item)
    // })
    // .catch(err => console.log('get error: ', err))
  }

  render() {
    if (this.props.showCart === false) {
      return <div />
    }
    return (
      <FlexView hAlignContent='center'>
        <div className="cart">
          <CartItems
            cart={this.state.cart}
            cartQty={this.state.cartQty}
            cartTotal={this.state.cartTotal}
            changeQty={this.changeQty}
            logEvent={this.logEvent}
            goToItem={this.goToItem}
          />
          <CartTotal
            cartTotal={this.state.cartTotal}
            cartQty={this.state.cartQty}
          />
        </div>
      </FlexView>
    );
  }
}