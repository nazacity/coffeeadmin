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
      createdAt
    }
  }
`;

export const QUERY_ORDER_FORPAYING = gql`
  query QUERY_ORDER_FORPAYING($orderId: ID!) {
    order(orderId: $orderId) {
      id
      amount
      discount
      net
      by
      status
      discount
      items {
        id
        storeProduct {
          id
          name
          pictureUrl
          price
        }
        quantity
      }
      place {
        id
      }
    }
  }
`;

export const QUERY_SALESTOREPRODUCTDAILY = gql`
  query QUERY_SALESTOREPRODUCTDAILY($year: Float, $month: Float, $day: Float) {
    saleStoreProductDaily(year: $year, month: $month, day: $day) {
      id
      name
      pictureUrl
      totalSales
    }
  }
`;

export const QUERY_SALEONLINEPRODUCTDAILY = gql`
  query QUERY_SALEONLINEPRODUCTDAILY($year: Float, $month: Float, $day: Float) {
    saleOnlineProductDaily(year: $year, month: $month, day: $day) {
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
