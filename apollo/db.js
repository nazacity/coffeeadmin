import fetch from 'isomorphic-unfetch';

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
