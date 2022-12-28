<template>
    <v-container>
      <v-row no-gutters>
        <v-col
          v-if='clientSecret'
          col="12"
          class="text-center"
        >
          <h2 class="my-5 pb-8">
            Choose your Subscription!
          </h2>
  
          <transition name="fade">
            <!-- v-show="third" -->
            <v-row
              align="center"
              justify="center"
            >
              <v-card
                elevation="3"
                id="thirdCard"
              >
                <v-card-title
                  id="font"
                  primary-title
                  class="gradient mb-5"
                >
                  Enter your card details.<br>
                </v-card-title>
  
                <v-card-subtitle
                  align="left"
                  class="subtitle-1 mb-3"
                >
                  <b>Your Subscription will start Now.</b>
                </v-card-subtitle>
  
                <v-card-text
                  align="left"
                  class="headline"
                >
                  <v-icon>mdi-arrow-right-bold</v-icon>Total: <b>{{ price }}</b><br>
                  <v-icon>mdi-arrow-right-bold</v-icon>Subscribing to: <b>{{ plan }}</b><br>
                  <v-icon>mdi-arrow-right-bold</v-icon>Full Name: <b>{{ fullName }}</b>
                </v-card-text>
                <!-- form -->
                <v-form v-model="valid">
                  <v-container>
                    <div class="mt-5">
                      <!-- stripe -->
                      <div
                        id="card"
                        class="inputCard"
                      />
  
                      <!-- We'll put the error messages in this element -->
                      <div
                        id="card-errors"
                        role="alert"
                      />
                      <br>
                      <v-alert
                        v-model="alert"
                        color="red"
                        dense
                        dismissible
                        type="error"
                      >
                        {{ alertTxt }}
                      </v-alert>
                      <v-btn
                        id="stripeBtn"
                        class="my-3"
                        block
                        :loading="loading"
                        @click="Submit"
                      >
                        <v-icon class="mr-1">
                          mdi-credit-card-check-outline
                        </v-icon>
                        Pay with Stripe
                      </v-btn>
                    </div>
                  </v-container>
                </v-form>
              </v-card>
            </v-row>
          </transition>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import PostService from '../post-service'
  import { loadStripe } from "@stripe/stripe-js";
  
  // Create an instance of Elements.
//   const elements = stripe.elements()
//   const style = {
//     base: {
//       color: '#32325d',
//       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//       fontSmoothing: 'antialiased',
//       fontSize: '16px',
//       '::placeholder': {
//         color: '#aab7c4',
//       },
//     },
//     invalid: {
//       color: '#fa755a',
//       iconColor: '#fa755a',
//     },
//   };
  
//   const card = elements.create('card', { style: style })
  
  export default {
    name: 'Checkout',
  
    props: {
      fullName: String,
      price: String,
      plan: String,
      clientSecret: String,
      subscriptionId: String
    },
  
    data: () => ({
      valid: false,
      alert: false,
      loading: false,
      alertTxt: '',

      card: null,
      stripe: null,
      amount: null,
      plandId: null,
      loader: false,
      state: false,
      error:null,
      disabled:false
    }),
  
    async mounted() {
      console.log('n',this.fullName,this.price,this.plan,this.clientSecret,this.subscriptionId)
  
    //   card.mount(this.$refs.card)
  
    //   card.on('change', (event) => {
    //     this.displayError(event)
    //   })
    
    let elements = null;
      // var card = null;
      // console.log("hello");
      const ELEMENT_TYPE = "card";

      this.stripe = await loadStripe(
        "your_stripe_public_key"
      );
      // this.publishableKey = "";

      elements = this.stripe.elements();
      this.card = elements.create(ELEMENT_TYPE, {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      });
      this.card.mount("#card")
      
    },
    
  
    
  
    methods: {
      displayError(event) {
        const displayError = document.getElementById('card-errors')
        if (event.error) {
          displayError.textContent = event.error.message
        } else {
          displayError.textContent = ''
        }
      },
  
      async Submit() {
        this.loading = true
        var { clientSecret, fullName, alert, alertTxt, loading } = this

        
        var result = await this.stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            type: 'card',
            card: this.card,
            billing_details: {
              name: fullName,
            }
          }
        })
  
        if (result.error) {
            
          this.$emit("PaymentFail", result)

          console.log(result.error)
          alert = true
          alertTxt = result.error.message
          loading = false
        } else {
          // Successful subscription payment
          // The subscription automatically becomes active upon payment.
          this.$emit("PaymentSuccess", result)

          this.$router.push({
            name: 'ThankYou',
            params: {
              subscriptionId: this.subscriptionId
            }
          })
        }
      },
      async  renderCard() {
      // let stripe = null;

      let elements = null;
      // var card = null;
      // console.log("hello");
      const ELEMENT_TYPE = "card";

      this.stripe = await loadStripe(
        "your_stripe_public_key"
      );
      // this.publishableKey = "";

      elements = this.stripe.elements();
      this.card = elements.create(ELEMENT_TYPE, {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      });
      this.card.mount("#card");
    }
    }
  }
  </script>
  