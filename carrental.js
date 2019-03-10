let express = require('express');
let bodyParser = require('body-parser');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

const schema = gql`
  type Query{    
      customer(id: ID!): Customer,
      customers: [Customer!]!,
      car(id: ID!): Car,
      cars: [Car!]!,
      invoice(id: ID!): Invoice,
      invoices: [Invoice!]!,
      invoicesByCustomer(customerid: ID!): [Invoice!]!, 
      invoicesByCar(carid: ID!): [Invoice!]!
  }

  

  type Customer {
    id: ID!,
    name: String!,
    email: String!,
    address: String!,
    addressCity: String!,
    addressCountry: String!,
    phone: String!,
  }

     type Car {
      id: ID!,
      name: String!,
      model: String!,
      colour: String!,
    
       }
      
     

  type Invoice {
    id: ID!,
    createdDate: String!,
    paymentDate: String,
    customer: Customer!
    description: String!
    }
    
    type ItemCreatedResponse{
      success: Boolean!
    }
    type ItemupdatedResponse{
      success: Boolean!
    }
    
    `;
let c = 1;
const customers = [
  {
       id: c++,
       name: "Samm",
       email: "samm123@gmail.com",
       address: "Kajanitie 789",
       addressCity: "Oulu",
       addressCountry: "Finland",
       phone:"0456352752",
  },
  {
       id: c++,
       name: "Sunny",
       email: "sunny123@gmail.com",
       address: "Kajanitie 780",
       addressCity: "Oulu",
       addressCountry: "Finland",
       phone:"0456352752",

  },

];
let a = 1;
let Cars = [
  {
        id: a++,
        name: "Toyota",
        model: "Toyota156",
        colour: "Red",
      
  },
  {
        id: a++,
        name: "Hyundai",
        model: "Hyundai15",
        colour: "Blue",
   
  },

];

let i= 1;
let invoices = [
  {
       id: "1",
       createdDate: "2019-03-10",
       paymentDate: null,
       customer: "2",
       description: "Good Customer"
  },
  {
       id: "2",
       createdDate: "2019-02-19",
       paymentDate: null,
       customer: "1",
       description: "Barrel of fish"
  },
];


const resolvers = {
  Query: {
       customer: (parent, args, context, info) => {      
       return costumers.find(c => c.id === +args.id);
    },
       customers: (parents, args, context, info) => {
       return customers;
    },
       car: (parent, args, context, info) => {      
       return cars.find(a => a.id === +args.id);
     },
        cars: (parents, args, context, info) => {
        return cars;
    },
       invoice: (parents, args, context, info) => {
       const invoice = invoices.find(i => i.id  === +args.id);
    },
       invoices:(parents, args, context, info) => {
       return invoices;
    }
  },
  };

  
const server = new ApolloServer({
     typeDefs: schema,
     resolvers,
     formatError: error => {
     console.log(error);
      return error;
  },
  formatResponse: response => {
    console.log(response);
    return response;
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
