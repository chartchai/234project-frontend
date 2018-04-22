import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const getAllProduct = gql`
  query {
    products{
      id
      productId
      name
      description
      imageLocation
      price
    }
  }
`;

@Injectable()
export class ProductService {

  constructor(private apollo: Apollo) {}
  getProducts() {
    return this.apollo.watchQuery<any>({
      query: getAllProduct
    }).valueChanges;
  }
}
