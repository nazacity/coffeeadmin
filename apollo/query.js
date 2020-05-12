import gql from 'graphql-tag';

export const QUERY_USER = gql`
  query QUERY_USER {
    user {
      id
      lineId
      firstName
      lastName
      email
      phone
      pictureUrl
      state
      carts {
        id
        product {
          id
          name
          pictureUrl
          price
        }
        quantity
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query QUERY_USERS {
    users {
      id
      lineId
      firstName
      lastName
      email
      phone
      pictureUrl
      state
      carts {
        id
        product {
          id
          name
          pictureUrl
          price
        }
        quantity
      }
      createdAt
    }
  }
`;

export const QUERY_CATALOGS = gql`
  query QUERY_CATALOGS {
    catalogs {
      id
      name
      th
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query QUERY_PRODUCTS {
    products {
      id
      name
      description
      pictureUrl
      price
      catalog
    }
  }
`;

export const QUERY_PRODUCT = gql`
  query QUERY_PRODUCT($id: String!) {
    product(id: $id) {
      id
      name
      description
      pictureUrl
      price
      catalog
    }
  }
`;

export const QUERY_ORDERS = gql`
  query QUERY_ORDERS($id: String!) {
    product(id: $id) {
      id
      name
      description
      pictureUrl
      price
      catalog
    }
  }
`;
