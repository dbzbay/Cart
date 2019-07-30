import React from 'react';

const CartItems = props => (
  <div className="cart_left-section">
    <div>
      <h4 className="cart_title">
Shopping Cart (
        {props.cartQty}
        {' '}
items)
      </h4>
    </div>
    <br />
    {props.cart.map((item, ind) => (
      <div className="cartItem" id={ind} key={item._id}>
        <div className="cart-head cart_flex">
          <h2 className="cart_truncate">
            <span className="cart_font-weight-light">
              <span>
                <span>Seller</span>
              </span>
            </span>
            <span className="cart_black-link">
                  &nbsp;
              <span>
                <a className="cart_a" href="" onClick={(e) => { e.preventDefault(); }} title={`Go to seller page: ${item.seller}`}>
                  <span>{item.seller}</span>
                </a>
              </span>
            </span>
          </h2>

          <span className="cart_flex">
            <span>
              <button type="button" className="cart_button cart_faux-link">
                <span>Pay only this seller</span>
              </button>
            </span>
          </span>
        </div>
        <div>
          <div className="cart-bucket-item">
            <div className="cart_item-line">
              <div className="cart_list-content">
                <div className="cart_grid-group">
                  <div className="cart_grid-cell-image">
                      <div className="cart-image">
                          <div className="cart_image-display">
                            <img
                              className="cart_image"
                              src={item.image1}
                              alt="Item"
                            />
                          </div>
                        </div>
                    </div>
                  <div className="cart_grid-cell-name">
                      <div className="cart_black-link">
                          <a className="cart_a" href="/">
                            <div
                              className="cart_name"
                              onClick={e => props.goToItem(item._id, e)}
                            >
                              {item.name}
                            </div>
                          </a>
                        </div>
                      <div className="cart_condition">{item.condition}</div>
                    </div>
                  <div className="cart_grid-cell-price">
                      <div className="cart_grid-group">
                          <div className="cart_quantity">
                            <span>Qty</span>
                            <span>
                              <select className="cart_qty-dropdown" value={item.qty} onChange={e => props.changeQty(ind, parseInt(e.target.value))}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                              </select>
                            </span>
                            <div className="cart_shipping">
                              Standard
                              <br />
                              Shipping
                              <br />
                              3-5 days
                            </div>
                          </div>
                          <div className="cart_item-price">
                            $
                            {(item.price * item.qty).toFixed(2)}
                            <div className="cart_shipping cart_shipping-price">
                              Free Shipping
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
                <div className="cart_item-footer">
                  <div>
                      <span>
                          <button type="button" className="cart_button cart_faux-link">
                            <span>Save for later</span>
                          </button>
                        </span>
                      <div className="cart_line-y">|</div>
                      <span>
                          <button
                            type="button"
                            className="cart_button cart_faux-link"
                            onClick={() => props.changeQty(ind, 0)}
                          >
                            <span>
                              Remove
                            </span>
                          </button>
                        </span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default CartItems;
