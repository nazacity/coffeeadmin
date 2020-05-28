export const getData = async (METHOD) => {
  const uri = process.env.APOLLO_URL;

  const response = await fetch(uri, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(METHOD),
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  }
};

export const QUERY_PROMOTIONS = {
  query: `
  query{
    promotion{
      id
      title
      detail
      pictureUrl
      products{
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
  `,
};

export const QUERY_EMPLOYEES = {
  query: `
  query{
    employees{
      id
      user{
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
  `,
};

export const QUERY_USER = {
  query: `
  query{
    user{
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
  `,
};

export const QUERY_USERS = {
  query: `
  query{
    users{
      id
      firstName
      lastName
      email
      phone
      pictureUrl
      state
      createdAt
    }
  }
  `,
};

export const QUERY_ORDERS = {
  query: `
  query{
    orders{
    id
    amount
    discount
    net
    by
    status
    discount
    step
    createdAt
    user{
      id
      firstName
      pictureUrl
      phone
    }
    items{
        id
        product{
          id
          name
          pictureUrl
        }
        quantity
      }
    }
  }
  `,
};

export const QUERY_BRANCH = {
  query: `
  query{
    branch{
          id
          branch
          place{
            id
            table
            order {
              id
            }
            adult
            children
            package
            state
            bill{
                  id
                  adult
                  children
                  createdAt
                }
          }
          stock{
            id
            pictureUrl
            name
            catalog{
              id
              name
              th
            }
            remain
            amount
            stockAdd{
              id
              buy
              amount
              createdAt
            }
            stockOut{
              id
              out
              cost
            }
          }
        }
    }
  `,
};

export const QUERY_BRANCHID = {
  query: `
  query{
    branch{
          id
          branch
        }
    }
  `,
};

export const getUserByAccessToken = async (accessToken) => {
  const uri = process.env.APOLLO_URL;
  let user;
  if (accessToken) {
    const responseUser = await fetch(uri, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${accessToken}` || '',
      },
      body: JSON.stringify(QUERY_USER),
    });
    if (responseUser.ok) {
      user = await responseUser.json();
    }
  }
  return user.data.user;
};

export const getUsersByAccessToken = async (accessToken) => {
  const uri = process.env.APOLLO_URL;
  let users;
  if (accessToken) {
    const responseUsers = await fetch(uri, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${accessToken}` || '',
      },
      body: JSON.stringify(QUERY_USERS),
    });
    if (responseUsers.ok) {
      users = await responseUsers.json();
    }
  }
  return users.data.users;
};

export const getEmployeesByAccessToken = async (accessToken) => {
  const uri = process.env.APOLLO_URL;
  let employees;
  if (accessToken) {
    const responseEmployees = await fetch(uri, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${accessToken}` || '',
      },
      body: JSON.stringify(QUERY_EMPLOYEES),
    });
    if (responseEmployees.ok) {
      employees = await responseEmployees.json();
    }
  }
  return employees.data.employees;
};

export const getOrders = async (accessToken) => {
  const uri = process.env.APOLLO_URL;
  let orders;
  if (accessToken) {
    const responseOrders = await fetch(uri, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${accessToken}` || '',
      },
      body: JSON.stringify(QUERY_ORDERS),
    });
    if (responseOrders.ok) {
      orders = await responseOrders.json();
    }
  }
  return orders.data.orders;
};

export const getBranch = async (accessToken) => {
  const uri = process.env.APOLLO_URL;
  let branch;
  if (accessToken) {
    const responseOrders = await fetch(uri, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${accessToken}` || '',
      },
      body: JSON.stringify(QUERY_BRANCH),
    });
    if (responseOrders.ok) {
      branch = await responseOrders.json();
    }
  }
  return branch.data.branch;
};

export const QUERY_STOCK_CATALOGS = {
  query: `
  query{
    stockCatalog {
      id
      name
      th
    }
  }
  `,
};

export const getStockCatalog = async (accessToken) => {
  const uri = process.env.APOLLO_URL;
  let stockCatalog;
  if (accessToken) {
    const responseOrders = await fetch(uri, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${accessToken}` || '',
      },
      body: JSON.stringify(QUERY_STOCK_CATALOGS),
    });
    if (responseOrders.ok) {
      stockCatalog = await responseOrders.json();
    }
  }
  return stockCatalog.data.stockCatalog;
};

export const QUERY_STOREPRODUCTCATALOG = {
  query: `
  query{
    storeProductCatalog {
      id
      name
      th
    }
  }
  `,
};

export const QUERY_STOREPRODUCT = {
  query: `
  query{
    storeProduct {
      id
      name
      price
      stockOutDetail{
        name
        out
      }
      pictureUrl
      package
      catalog{
        id
        name
        th
      }
    }
  }
  `,
};

export const QUERY_ONLINEPRODUCTCATALOG = {
  query: `
  query{
    onlineProductCatalog {
      id
      name
      th
    }
  }
  `,
};

export const QUERY_ONLINEPRODUCT = {
  query: `
  query{
    onlineProduct {
      id
      name
      price
      stockOutDetail{
        name
        out
      }
      pictureUrl
      package
      catalog{
        id
        name
        th
      }
    }
  }
  `,
};
