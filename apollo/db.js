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
