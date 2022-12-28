require('dotenv').config()
const express = require('express')
const stripe = require('stripe')("your_stripe_scret_key");
const router = express.Router()
router.use(express.json())




// Your Db connection

// Customer Create
var createToken = async function () {

  var param = {};
  param.card ={
      number: '4242424242424242',
      exp_month: 2,
      exp_year:2024,
      cvc:'212'
  }

 


}


router.post('/', async (req, res) => {

  const { email, fullname } = req.body;

  if (!email && !fullname) {
    return res.sendStatus(400);
  }

  try {
    // pass customer fullname and additional parameters
    const customer = await stripe.customers.create({
      email: email,
      name: fullname
    })


 
    
     
    if (customer) {
      // save the customer.id as stripeCustomerId
      // in your database.
      // console.log('customer',customer)
      return res.json({ customer: customer.id });
    }

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

// Create subscription
router.post('/subs', async (req, res) => {
  console.log(req.body)
  const { customerId, priceId } = req.body;

  if (!customerId && !priceId) {
    return res.sendStatus(403);
  }

  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    res.json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });

  } catch (error) {
    return res.sendStatus(400)
    console.log(error)
  }
});

// Delete the subscription
router.post('/delete', async (req, res) => {
  try {
    const deletedSubscription = await stripe.subscriptions.del(
      req.body.subscriptionId
    );
    res.send(deletedSubscription);

  } catch (error) {
    console.log(error);
  }
});




// Webhook listener
// router.post('/webhook',
//   express.raw({ type: 'application/json' }),
//   async (req, res) => {

//     let event;

//     try {
//       event = await stripe.webhooks.constructEvent(
//         req.body,
//         req.headers['stripe-signature'],
//         'whsec_0e04a3e4d3778c36f03ef8e4028f2590cbf98687a10bdf58a2355dea7d360979'
//       );
//       // Extract the object from the event.
//       const dataObject = event.data.object;

//       if (dataObject['billing_reason'] == 'subscription_create') {
//         const subscription_id = dataObject['subscription']
//         const payment_intent_id = dataObject['payment_intent']
//         console.log("do"),
//         console.log(event)

//         // Retrieve the payment intent used to pay the subscription
//         const payment_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

//         await stripe.subscriptions.update(
//           subscription_id,
//           {
//             default_payment_method: payment_intent.payment_method,
//           },
//         );

//         await stripe.customers.update(
//           payment_intent.customer,
//           {
//             invoice_settings: {
//               default_payment_method: payment_intent.payment_method,
//             },
//           }
//         );
//       };

//       switch (event.type) {
//         case 'payment_intent.succeeded':
//           const paymentIntent = event.data.object;
//           console.log("paymentIntent")
//           res.json({msg:paymentIntent})
//           console.log(paymentIntent)

//       // Then define and call a function to handle the event payment_intent.succeeded
//           break;
//         case 'invoice.paid':
//           // Used to provision services after the trial has ended.
//           // The status of the invoice will show up as paid. Store the status in your
//           // database to reference when a user accesses your service to avoid hitting rate limits.
//           // status paid
//           console.log('Invoice.paid: '+dataObject.status);
//           break;
//         case 'invoice.payment_succeeded':
//           // Insert payment succeeded into the database
//           // Allowed access to your service
//           // status paid
//           console.log('payment_succeeded: '+dataObject.status);
//           break;
//         case 'invoice.payment_failed':
//           // If the payment fails or the customer does not have a valid payment method,
//           // an invoice.payment_failed event is sent, the subscription becomes past_due.
//           // Use this webhook to notify your user that their payment has
//           // failed and to retrieve new card details.
//           // status open
//           console.log('invoice.payment_failed: '+dataObject.status);
//           break;
//         case 'customer.subscription.created':
//           // Insert active into database and grant access to service
//           // status active
//           console.log('customer.subscription.created: '+dataObject.status);
//           break;
//         case 'customer.subscription.updated':
//           // Insert active into database and grant access to service
//           // status active
//           console.log('customer.subscription.updated: '+dataObject.status);
//         break;
//         case 'customer.subscription.deleted':
//           if (event.request != null) {
//             // handle a subscription cancelled by request
//             // from above.
//             // status canceled
//             console.log('customer.subscription.deleted: '+dataObject.status);
//           } else {
//             // handle subscription cancelled automatically based
//             // upon subscription settings.
//             // status canceled
//             console.log('customer.subscription.deleted: ' +dataObject.status);
//           }
//           break;
//         default:
//           // Unexpected event type
//       }

//       // Return a response to acknowledge receipt of the event
//       res.sendStatus(200);
//       res.json({status:'success'})

//     } catch (err) {
//       console.log("error started")
//       // On error, log and return the error message
//       console.log(`❌ Error message: ${err.message}`);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }
//   }
// );




router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const endpointSecret = "whsec_0e04a3e4d3778c36f03ef8e4028f2590cbf98687a10bdf58a2355dea7d360979";
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
  } catch (err) {
    console.log('stripe error', err.message)
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
      console.log("hello")
  }
  response.json({status:"ok"})

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});















module.exports = router
