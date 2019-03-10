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
      rentalActivity(id: ID!): RentalActivity,
      rentalActivities: [RentalActivity!]!,
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
      
       type RentalActivity {
         id: ID!,
         carid: ID!,
         invoiceid: ID!,
         bookingstatus: String!,

       }
     

     type Invoice {
      id: ID!,
      createdDate: String!,
      paymentDate: String,
      customerid: ID!
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
let cars = [
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
let r = 1;
let rentalActivities = [
  {
    id: r++,
    carid: a++,
    invoiceid: c++,
    bookingstatus: "booked",
  },
];
let i = 1;
let invoices = [
  {
       id: i++,
       createdDate: "2019-03-01",
       paymentDate: 2019-03-07,
       customerid: c++,
       description: "Good Customer",
  },
  {
       id: i++,
       createdDate: "2019-03-02",
       paymentDate: 2019-03-08,
       customerid: c++,
       description: "Good Car",
  },
];


const resolvers = {
  Query: {
       customer: (parent, args, context, info) => {      
       return custumers.find(c => c.id === +args.id);
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
        rentalActivity:  (parent, args, context, info) => {    
        return rentalActivities.find(r => r.id === +args.id);
        },
        rentalActivities: (parent, args, context, info) => {    
          return rentalActivities;
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
