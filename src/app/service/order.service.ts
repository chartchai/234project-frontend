import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { SaleOrder, Product } from '../entity/product';
import gql from 'graphql-tag';

const saveOrder = gql`
  mutation saveSaleOrder($order: inputOrder!) {
    addOrder(order: $order) {
      id
    }
  }
`;

const getAllOrders = gql`
  query{
    saleOrders {
      id
      transactions {
        product {
          name
        }
        amount
      }
      totalPrice
  }
}
`;
@Injectable()
export class OrderService {

  constructor(private apollo: Apollo) { }

  cloneOrder(order: SaleOrder): SaleOrder {
    let output: SaleOrder = {
      transactions: []
    } as SaleOrder;
    for (var i = 0; i < order.transactions.length; i++) {
      const oldProduct = order.transactions[i].product;
      let newProduct: Product = {
        id: oldProduct.id,
        productId: oldProduct.productId,
        name: oldProduct.name,
        description: oldProduct.description,
        imageLocation: oldProduct.imageLocation,
        price: oldProduct.price
      };


      let newTransaction = {
        product: newProduct,
        amount: order.transactions[i].amount
      };

      output.transactions.push(newTransaction);

    };


    return output;

  }
  addOrder(order: SaleOrder) {

    return this.apollo.mutate({
      mutation: saveOrder,
      variables: {
        order: this.cloneOrder(order)
      },
      refetchQueries: [
        {
          query: getAllOrders
        }
      ]
    });
  }


  getOrders() {
    return this.apollo.watchQuery<any>({
      query: getAllOrders
    }).valueChanges;
  }
}
