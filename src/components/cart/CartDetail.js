import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Badge, Table, Button } from "reactstrap";
import alertify from "alertifyjs";
import * as cartActions from "../../redux/actions/cartActions";

class CartDetail extends Component {
  removedCart(product) {
    this.props.actions.removeFromCart(product);
    alertify.error("!!! " + product.productName + " silindi.");
  }
  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {this.props.cart.map((cartItem) => (
              <tr>
                <td>{cartItem.product.id}</td>
                <td>{cartItem.product.productName}</td>
                <td>{cartItem.product.unitePrice}</td>
                <td>{cartItem.quantity}</td>
                <td>
                  <Button
                    color="success"
                    onClick={() => {
                      this.removedCart(cartItem.product);
                    }}
                    key={cartItem.product.id}
                  >
                    Sil
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
