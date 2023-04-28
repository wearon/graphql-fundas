class Product {
  id: any;
  name: string;
  description: string
  price: number 
  soldout: boolean;
  stores: Store[];
  constructor(id, obj: any) {
    const { name, description, price, soldout, stores } = obj;
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.soldout = soldout;
    this.stores = stores;
  }
}

class Store {
  id: any;
  name: any;
  constructor(id, { name }) {
    this.id = id;
    this.name = name;
  }
}

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "This is product 1",
    price: 100,
    soldout: false,
    stores: [
      {
        id: 1,
        name: "San Francisco",
      },
      {
        id: 2,
        name: "New York",
      },
    ],
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is product 2",
    price: 200,
    soldout: false,
  },
  {
    id: 3,
    name: "Product 3",
    description: "This is product 3",
    price: 300,
    soldout: false,
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves products from the "products" array above.
export const resolvers = {
  Query: {
    product: () => products,
    getProducts: ({ id }) => {
      let _product = products.filter((product) => {
        return product.id == id;
      })[0];
      return new Product(id, _product);
    },
  },
  Mutation: {
    createProduct: (root, { input }) => {
      const id = require("crypto").randomBytes(10).toString("hex");
      products.push(new Product(id, input));
      return new Product(id, input);
    },
  },
};

/**
  mutation {
   createProduct(input: {
    name: "Product 4",
    description: "This is product 4",
    price: 400,
    soldout: false
    stores: [
        {
            id: 1,
            name: "San Francisco"
        },
        {
            id: 2,
            name: "New York"
        }
    ]
  }) {
  id name description price soldout stores {
    id name

  }
 }
 * 
 */
