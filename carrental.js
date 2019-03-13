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
         carmodel: String!,
         bookingstatus: String!,
         

       }
     

     type Invoice {
      id: ID!,
      createdDate: String!,
      paymentDate: String,
      customerid: ID!,
      description: String!,
    }
  
     type ItemCreatedResponse{
      success: Boolean!
    }
     type ItemupdatedResponse{
      success: Boolean!
    }
    
  
    type Mutation {
      createCustomer (
        name: String,
        email: String,
        address: String,
        addressCity: String,
        addressCountry: String,
        phone: String
      )
      
      : ItemCreatedResponse!
  
      updateCustomer (
        id: ID,
        name: String,
        email: String,
        address: String,
        addressCity: String,
        addressCountry: String,
        phone: String
      )
     
      :ItemupdatedResponse!
    
    createCar(
      name: String,
      model: String,
      colour: String

   ):ItemCreatedResponse!
    
   updateCar(
     id: ID,
      name: String,
      model: String,
      colour: String,
      ):ItemupdatedResponse!

      createInvoice(
      
        createdDate: String!,
        paymentDate: String,
        customerid: ID!,
        description: String!
  
     ):ItemCreatedResponse!

     updateInvoice(
      id: ID!,
      createdDate: String!,
      paymentDate: String,
      customerid: ID!,
      description: String!,

     ):ItemupdatedResponse!
     
     createRentalActivity(
      carmodel: String!,
      bookingstatus: String,
 
    )
     :ItemCreatedResponse!

     updateRentalActivity(
       id: ID!,
       carmodel: String!,
       bookingstatus: String!,
     )
     :ItemupdatedResponse!
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
let r = 1;
let rentalActivities = [
  {
    id: r++,
    carmodel: "Hyundai299",
    bookingstatus: "booked"
  },
];





const resolvers = {
  Query:
   {
       customer: (parent, args, context, info) => {      
       return customers.find(c => c.id === +args.id);
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
    },
      invoicesByCustomer: (parent, args, context, info) => {
       if (args.customerid) {
         return invoices.filter(i => i.customerid === +args.customerid);
       }
      },
      invoicesByCar: (parent, args, context, info) => {
        if (args.carid) {
            return invoices.filter(i => i.carid === +args.carid);
        }  
  }


},
Mutation: {
    createCustomer: (parent, args, context, info) => {
           const customer = {
           id: ((customers.length) + 1).toString(),
           name: args.name,
           email: args.email,
           address: args.address,
           addressCity: args.addressCity,
           addressCountry: args.addressCountry,
           phone: args.phone,
           }
    
        customers.push(customer);
        return {success: true}
  },
       updateCustomer: (parent, args, context, info) => {
       if (args.id) {
       const customer = customers.find(c => c.id === +args.id);

      if (customer) {
        customer.name = args.name ? args.name : customer.name;
        customer.email = args.email ? args.email :  customer.email;
        customer.address = args.address ? args.address : customer.address;
        customer.addressCity = args.addressCity ? args.addressCity : customer.addressCity;
        customer.addressCountry = args.addressCountry ? args.addressCountry : customer.addressCountry;
        customer.phone = args.phone ? args.phone: customer.phone;
        return { success: true }
      }

    }
    return {success: false }
    },
    createCar: (parent,args,context, info)=>{
      const car={
        id:((cars.length)+1).toString(),
        name:args.name,
        model:args.model,
        colour:args.colour
      };
      cars.push(car);
      return{success:true};
  
    },
    updateCar: (parent, args, context, info) => {
      if (args.id) {
          const car = cars.find(a => a.id === +args.id);
          if (car) {
            car.name = args.name ? args.name : car.name;
              car.model = args.model ? args.model : car.model;
              car.colour = args.colour ? args.colour : car.colour;
            return {success: true};
          }
      }
      return {success: false}
    },
      createInvoice: (parent,args,context, info)=>{
        const invoice={
          id:((invoices.length)+1).toString(),
          createdDate:args.createdDate,
          paymentDate:args.paymentDate,
          customerid:args.customerid,
          description:args.description
        };
        invoices.push(invoice);
        return{success:true} 
    
      },
      updateInvoice: (parent, args, context, info) => {
        if (args.id) {
            const invoice = invoices.find(i => i.id === +args.id);
            if (invoice) {
              invoice.createdDate = args.createdDate ? args.createdDate : invoice.createdDate;
                invoice.paymentDate = args.paymentDate ? args.paymentDate : invoice.paymentDate;
                invoice.customerid = args.customerid ? args.customerid : invoice.customerid;
                invoice.description = args.description ? args.description : invoice.description;
                return {success: true}
            }
        }
        return{success:false}
      },

      createRentalActivity: (parent,args,context, info)=>{
        const rentalActivity={
          id:((rentalActivities.length) + 1).toString(),
          carmodel:args.carmodel,
          bookingstatus:args.bookingstatus
        };
        rentalActivities.push(rentalActivity);
        return{success:true}
    
      },
      updateRentalActivity: (parent, args, context, info) => {
        if (args.id) {
            const RentalActivity = rentalActivities.find(i => i.id === +args.id);
            if (rentalActivity) {
              rentalActivity.carmodel = args.carmodel ? args.carmodel : rentalActivity.carmodel;
              rentalActivity.bookingstatus = args.bookingstatus ? args.bookingstatus : rentalActivity.bookingstatus;
                return {success: true}
            }
        }
        return{success:false}
      },
    
    }

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
