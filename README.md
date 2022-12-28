# component usage
<createCustomer 
@customerCreationSuccess="customerCreationSuccess"
@customerCreationFail="customerCreationFail" 

/>
 
 # for subscription
  <selectPlan
    :customerId="this.customerId"
    :priceId="this.priceId" 
    :fullName="this.fullName"
    @createSubscriptionSuccess="createSubscriptionSuccess" 
    @createSubscriptionFail="createSubscriptionFail"
    />

  # for payment
  <CheckoutComponent
  :fullName="this.fullName"
  :price="this.price" 
  :plan="this.plan" 
  :clientSecret="this.clientSecret" 
  :subscriptionId="this.subscriptionId"  
  @PaymentSuccess="PaymentSuccess"
  @PaymentFail="PaymentFail"
  />




emitted methods 

@customerCreationSucces will be emitted when customer is created and customerId is obtained 

@customerCreationFail will be emitted when error occured while customer creation and error will returned

@createSubscriptionSuccess will be emitted when customer is created and clientSecret is obtained is obtained 
  
@createSubscriptionFail will be emitted when error occured while subscription creation and error will returned
  
@PaymentSuccess  will be emitted when payment is success  and payment object returned

@paymentFail will be emitted when payment is failed  and error object returned




# Subscription Boilerplate and one TimePayment

Basic Subscription system using Stripe, Vue, Express and Vuetify.

# Stripe Api keys
  Create Stripe account and copy Public key and secret key.
  then change pk varible in client/src/views/Home.vue and client/src/views/checkout.vue
          pk:'your_pk_test_key',


  then change stripe secret key in server/routes/api/post.js 
    const stripe = require('stripe')("your_sk_test_key");
    
 #  stripe and Node(backend)
 All stripe methods are in 
     server/routes/api/post.js 
 #   stripe (front end)
   backend stripe methods are integrated in client/src/post-service.js
    
## Requirements

Node.js ^16.13.1 | Vue v2

## Project setup server side

- Clone repository

```javascript
git clone https://github.com/<your-github-username>/vue-stripe.git
```
- cd to vue-stripe

```
npm install
npm start
```

## Project setup client side

- Open new terminal

```
cd client
npm install
npm run serve
```


## oneTimePayment copomonent
```
client/src/components/oneTimePayment.vue
pass props as public key and lineItems object which contins priceId and quantity
```
## Creating Customer view
```
client/src/views/Home.vue

Enter Email and FullName and click to Create Customer

creating customer is success then generates custmerId

```
## Select Plan  
```
client/src/views/Plan.vue

Accepts props  
 props: {
    fullName: String,
    customerId: String,
    priceId:String
   
  },
  creating Subscription is success then generates clientSecret and subscriptionId.


```
## Payment(Checkout)  
```
client/src/views/checkout.vue

Accepts props  
 props: {
    fullName: String,
    price: String,
    plan: String,
    clientSecret: String,
    subscriptionId: String
  },
  ```
  
  
  ## delete Subscription  
```
client/src/views/Thankyou.vue

Accepts props  
  props: {
    subscriptionId: String
  },
  
  

```


