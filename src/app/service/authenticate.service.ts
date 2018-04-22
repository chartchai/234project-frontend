import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const authen = gql`
  query getUser($username:String,$password:String){
    user(username:$username,password:$password){
      username
      password
      role
    }
}
`;
@Injectable()
export class AuthenticateService {
  
  constructor(private apollo: Apollo) { }

  getUser(username:string, password: string) {
    return this.apollo.watchQuery<any>({
      query: authen,
      variables:{
        username: username,
        password: password
      }
    }).valueChanges;
  }
}
