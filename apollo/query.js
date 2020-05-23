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
  query QUERY_ORDERS {
    orders {
      id
      amount
      discount
      net
      by
      status
      discount
      place {
        branch
        table
      }
      user {
        id
        firstName
        pictureUrl
      }
      items {
        id
        product {
          id
          name
          pictureUrl
        }
        quantity
      }
    }
  }
`;

export const QUERY_BESTSALEMONTHLY = gql`
  query QUERY_BESTSALEMONTHLY($year: Float, $month: Float) {
    bestSaleMonthly(year: $year, month: $month) {
      id
      name
      pictureUrl
      totalSales
    }
  }
`;

export const QUERY_SALEDAILY = gql`
  query QUERY_SALEDAILY($year: Float, $month: Float, $day: Float) {
    saleDaily(year: $year, month: $month, day: $day) {
      id
      name
      pictureUrl
      totalSales
    }
  }
`;

export const QUERY_EMPLOYEE = gql`
  query QUERY_EMPLOYEE {
    employee {
      id
      IDcardPictureUrl
      state
      position
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
  }
`;

export const QUERY_STOREPRODUCTCATALOG = gql`
  query QUERY_STOREPRODUCTCATALOG {
    storeProductCatalog {
      id
      name
      th
    }
  }
`;

export const QUERY_STOCKNAME = gql`
  query QUERY_STOCKNAME {
    stockName {
      name
    }
  }
`;
