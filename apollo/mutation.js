import gql from 'graphql-tag';

export const MUTATION_SIGNINWITHACCESSTOKEN = gql`
  mutation MUTATION_SIGNINWITHACCESSTOKEN(
    $accessToken: String
    $branch: String
    $table: String
  ) {
    signinWithAccessToken(
      accessToken: $accessToken
      branch: $branch
      table: $table
    ) {
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

export const MUTAION_UPDATEUSER = gql`
  mutation MUTAION_UPDATEUSER(
    $id: ID!
    $firstName: String
    $lastName: String
    $phone: String
    $state: String
    $email: String
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      state: $state
      email: $email
    ) {
      id
      firstName
      lastName
      phone
      state
    }
  }
`;

export const MUTAION_CREATECATALOG = gql`
  mutation MUTAION_CREATECATALOG($name: String!, $th: String!) {
    createCatalog(name: $name, th: $th) {
      id
      name
      th
    }
  }
`;

export const MUTAION_DELETECATALOG = gql`
  mutation MUTAION_DELETECATALOG($id: ID!) {
    deleteCatalog(id: $id) {
      id
    }
  }
`;

export const MUTAION_CREATEPRODUCT = gql`
  mutation MUTAION_CREATEPRODUCT(
    $name: String!
    $description: String!
    $price: Float!
    $pictureUrl: String!
    $catalog: String!
  ) {
    createProduct(
      name: $name
      description: $description
      price: $price
      pictureUrl: $pictureUrl
      catalog: $catalog
    ) {
      id
      name
      description
      pictureUrl
      price
      catalog
    }
  }
`;

export const MUTAION_UPDATERODUCT = gql`
  mutation MUTAION_UPDATERODUCT(
    $id: ID!
    $name: String
    $description: String
    $price: Float
    $pictureUrl: String
    $catalog: String
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      price: $price
      pictureUrl: $pictureUrl
      catalog: $catalog
    ) {
      id
      name
      description
      pictureUrl
      price
      catalog
    }
  }
`;

export const MUTAION_DELETEPRODUCT = gql`
  mutation MUTAION_DELETEPRODUCT($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

export const MUTAION_CREATEPROMOTION = gql`
  mutation MUTAION_CREATEPROMOTION(
    $title: String
    $detail: String
    $products: [String]!
    $price: Float
  ) {
    createPromotion(
      title: $title
      detail: $detail
      products: $products
      price: $price
    ) {
      id
      title
      detail
      pictureUrl
      products {
        id
        name
        description
        price
        pictureUrl
        catalog
        createdAt
      }
      price
    }
  }
`;

export const MUTAION_UPDATEEMPLOYEE = gql`
  mutation MUTAION_CREATEPROMOTION(
    $id: ID!
    $IDcardPictureUrl: String
    $state: String
    $pin: String
    $position: String
  ) {
    updateEmployee(
      id: $id
      IDcardPictureUrl: $IDcardPictureUrl
      state: $state
      pin: $pin
      position: $position
    ) {
      id
      user {
        id
        firstName
        lastName
        phone
        email
        pictureUrl
        lineId
        state
      }
      state
      position
      pin
      IDcardPictureUrl
      createdAt
    }
  }
`;

export const MUTATION_CANCEL_ORDERITEM_BY_ID = gql`
  mutation MUTATION_CANCEL_ORDERITEM_BY_ID(
    $orderId: String!
    $orderItemId: String!
  ) {
    cancelOrderItemByID(orderId: $orderId, orderItemId: $orderItemId) {
      id
      amount
      user {
        id
        lineId
        pictureUrl
        firstName
        phone
      }
      items {
        id
        product {
          name
          pictureUrl
        }
        quantity
        state
      }
      createdAt
    }
  }
`;

export const MUTATION_DONE_ORDERITEM_BY_ID = gql`
  mutation MUTATION_DONE_ORDERITEM_BY_ID($orderItemId: String!) {
    doneOrderItemByID(orderItemId: $orderItemId) {
      id
    }
  }
`;
