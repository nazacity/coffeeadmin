import gql from 'graphql-tag';

export const MUTATION_SIGNINWITHACCESSTOKEN = gql`
  mutation MUTATION_SIGNINWITHACCESSTOKEN($accessToken: String) {
    signinWithAccessToken(accessToken: $accessToken) {
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
  mutation MUTAION_UPDATEEMPLOYEE(
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

export const MUTAION_DELETEEMPLOYEE = gql`
  mutation MUTAION_DELETEEMPLOYEE($id: ID!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;

export const MUTATION_CANCEL_ORDERITEM_BY_ID = gql`
  mutation MUTATION_CANCEL_ORDERITEM_BY_ID(
    $orderId: String!
    $orderItemId: String!
    $quantity: Float!
  ) {
    cancelOrderItemByID(
      orderId: $orderId
      orderItemId: $orderItemId
      quantity: $quantity
    ) {
      id
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

export const MUTATION_CREATE_BRANCH = gql`
  mutation MUTATION_CREATE_BRANCH($branch: String!) {
    createBranch(branch: $branch) {
      id
      branch
    }
  }
`;

export const MUTATION_CREATE_TABLE = gql`
  mutation MUTATION_CREATE_TABLE($branchId: ID!, $table: String!) {
    createPlace(branchId: $branchId, table: $table) {
      id
      branch
      place {
        id
        table
        state
        adult
        children
        package
      }
    }
  }
`;

export const MUTATION_UPDATEPLACE_CREATETABLE = gql`
  mutation MUTATION_UPDATEPLACE_CREATETABLE(
    $placeId: ID!
    $adult: Float!
    $children: Float!
    $package: Float
  ) {
    updatePlaceAndCreateTable(
      placeId: $placeId
      adult: $adult
      children: $children
      package: $package
    ) {
      id
      branch
      place {
        id
        table
        state
        adult
        children
        package
        bill {
          id
          adult
          children
          createdAt
        }
      }
    }
  }
`;

export const MUTAION_CREATE_STOCKCATALOG = gql`
  mutation MUTAION_CREATE_STOCKCATALOG($name: String!, $th: String!) {
    createStockCatalog(name: $name, th: $th) {
      id
      name
      th
    }
  }
`;

export const MUTAION_DELETE_STOCKCATALOG = gql`
  mutation MUTAION_DELETE_STOCKCATALOG($id: ID!) {
    deleteStockCatalog(id: $id) {
      id
    }
  }
`;

export const MUTATION_CREATE_STOCK = gql`
  mutation MUTAION_CREATE_STOCK(
    $name: String!
    $catalogId: ID!
    $branchId: ID!
    $pictureUrl: String!
  ) {
    createStock(
      name: $name
      catalogId: $catalogId
      branchId: $branchId
      pictureUrl: $pictureUrl
    ) {
      id
      branch
      place {
        id
        table
        adult
        children
        package
        state
        bill {
          id
          adult
          children
          createdAt
        }
      }
      stock {
        id
        pictureUrl
        name
        catalog {
          id
        }
        remain
        amount
        stockAdd {
          id
          buy
          amount
          createdAt
        }
        stockOut {
          id
          out
          cost
        }
      }
    }
  }
`;

export const MUTATION_UPDATE_STOCK = gql`
  mutation MUTATION_UPDATE_STOCK(
    $id: ID!
    $name: String!
    $pictureUrl: String!
  ) {
    updateStock(id: $id, name: $name, pictureUrl: $pictureUrl) {
      id
      branch
      place {
        id
        table
        adult
        children
        package
        state
        bill {
          id
          adult
          children
          createdAt
        }
      }
      stock {
        id
        pictureUrl
        name
        catalog {
          id
        }
        remain
        amount
        stockAdd {
          id
          buy
          amount
          createdAt
        }
        stockOut {
          id
          out
          cost
        }
      }
    }
  }
`;

export const MUTATION_DELETE_STOCK = gql`
  mutation MUTATION_DELETE_STOCK($id: ID!) {
    deleteStock(id: $id) {
      id
      branch
      place {
        id
        table
        adult
        children
        package
        state
        bill {
          id
          adult
          children
          createdAt
        }
      }
      stock {
        id
        pictureUrl
        name
        catalog {
          id
        }
        remain
        amount
        stockAdd {
          id
          buy
          amount
        }
        stockOut {
          id
          out
          cost
        }
      }
    }
  }
`;

export const MUTATION_CREATE_STOCKADD = gql`
  mutation MUTATION_CREATE_STOCKADD(
    $stockId: ID!
    $buy: Float!
    $amount: Float!
  ) {
    createStockAdd(stockId: $stockId, buy: $buy, amount: $amount) {
      id
      branch
      place {
        id
        table
        adult
        children
        package
        state
        bill {
          id
          adult
          children
          createdAt
        }
      }
      stock {
        id
        pictureUrl
        name
        catalog {
          id
        }
        remain
        amount
        stockAdd {
          id
          buy
          amount
        }
        stockOut {
          id
          out
          cost
        }
      }
    }
  }
`;

export const MUTAION_CREATE_STOREPRODUCTCATALOG = gql`
  mutation MUTAION_CREATE_STOREPRODUCTCATALOG($name: String!, $th: String!) {
    createStoreProductCatalog(name: $name, th: $th) {
      id
      name
      th
    }
  }
`;

export const MUTAION_DELETE_STOREPRODUCTCATALOG = gql`
  mutation MUTAION_DELETE_STOREPRODUCTCATALOG($id: ID!) {
    deleteStoreProductCatalog(id: $id) {
      id
    }
  }
`;

export const MUTAION_CREATE_STOREPRODUCT = gql`
  mutation MUTAION_CREATE_STOREPRODUCT(
    $name: String!
    $price: Float!
    $stockOutDetail: [StockOutDetailInput]
    $pictureUrl: String!
    $catalogId: ID!
  ) {
    createStoreProduct(
      name: $name
      price: $price
      stockOutDetail: $stockOutDetail
      pictureUrl: $pictureUrl
      catalogId: $catalogId
    ) {
      id
      name
      price
      stockOutDetail {
        name
        out
      }
      pictureUrl
      package
      catalog {
        id
        name
        th
      }
    }
  }
`;

export const MUTAION_UPDATE_STOREPRODUCT = gql`
  mutation MUTAION_UPDATE_STOREPRODUCT(
    $id: ID!
    $name: String
    $price: Float
    $pictureUrl: String
    $catalogId: ID
  ) {
    updateStoreProduct(
      id: $id
      name: $name
      price: $price
      pictureUrl: $pictureUrl
      catalogId: $catalogId
    ) {
      id
      name
      price
      stockOutDetail {
        name
        out
      }
      pictureUrl
      package
      catalog {
        id
        name
        th
      }
    }
  }
`;

export const MUTAION_DELETE_STOREPRODUCT = gql`
  mutation MUTAION_DELETE_STOREPRODUCT($id: ID!) {
    deleteStoreProduct(id: $id) {
      id
      name
      pictureUrl
    }
  }
`;

// Online Product
export const MUTAION_CREATE_ONLINEPRODUCTCATALOG = gql`
  mutation MUTAION_CREATE_ONLINEPRODUCTCATALOG($name: String!, $th: String!) {
    createOnlineProductCatalog(name: $name, th: $th) {
      id
      name
      th
    }
  }
`;

export const MUTAION_DELETE_ONLINEPRODUCTCATALOG = gql`
  mutation MUTAION_DELETE_ONLINEPRODUCTCATALOG($id: ID!) {
    deleteOnlineProductCatalog(id: $id) {
      id
    }
  }
`;

export const MUTAION_CREATE_ONLINEPRODUCT = gql`
  mutation MUTAION_CREATE_ONLINEPRODUCT(
    $name: String!
    $price: Float!
    $stockOutDetail: [StockOutDetailInput]
    $pictureUrl: String!
    $catalogId: ID!
  ) {
    createOnlineProduct(
      name: $name
      price: $price
      stockOutDetail: $stockOutDetail
      pictureUrl: $pictureUrl
      catalogId: $catalogId
    ) {
      id
      name
      price
      stockOutDetail {
        name
        out
      }
      pictureUrl
      package
      catalog {
        id
        name
        th
      }
    }
  }
`;

export const MUTAION_UPDATE_ONLINEPRODUCT = gql`
  mutation MUTAION_UPDATE_ONLINEPRODUCT(
    $id: ID!
    $name: String
    $price: Float
    $pictureUrl: String
    $catalogId: ID
  ) {
    updateOnlineProduct(
      id: $id
      name: $name
      price: $price
      pictureUrl: $pictureUrl
      catalogId: $catalogId
    ) {
      id
      name
      price
      stockOutDetail {
        name
        out
      }
      pictureUrl
      package
      catalog {
        id
        name
        th
      }
    }
  }
`;

export const MUTAION_DELETE_ONLINEPRODUCT = gql`
  mutation MUTAION_DELETE_ONLINEPRODUCT($id: ID!) {
    deleteOnlineProduct(id: $id) {
      id
      name
      pictureUrl
    }
  }
`;
