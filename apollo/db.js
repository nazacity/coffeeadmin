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

export const QUERY_PRODUCTS = {
  query: `
  query{
    products{
      id
      name
      description
      price
      pictureUrl
      catalog
    }
  }
  `,
};

export const QUERY_CATALOGS = {
  query: `
  query{
    catalogs {
      id
      name
      th
    }
  }
  `,
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
      carts{
        id
        product{
          id
          name
          pictureUrl
          price
        }
        quantity
      }
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
      carts{
        id
        product{
          id
          name
          pictureUrl
          price
        }
        quantity
      }
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
