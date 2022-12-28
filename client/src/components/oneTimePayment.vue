<template>
  <div>
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="v => loading = v"
    />
    <!-- <p>{{this.publishableKey}}</p> -->
    <v-btn @click="submit">Pay now!</v-btn>
  </div>
</template>
    
    <script>
import { StripeCheckout } from "@vue-stripe/vue-stripe";
export default {
  props: {
    id: Number,
    items: Object,
    publishableKey: String
    // priceId: String,
  },
  components: {
    StripeCheckout
  },
  mounted() {
    console.log(this._props);
    this.publishableKey = this._props.publishableKey;

    this.lineItems.push({
      price: this._props.items[0].price,
      quantity: this._props.items[0].quantity
    });
  },
  data() {
    this.publishableKey = "";
    return {
      loading: false,
      lineItems: [
        // {
        //   price: 'price_1Lje1wSEvKMW8AqaYctPi2M8', // The id of the one-time price you created in your Stripe dashboard
        //   quantity: 1,
        // },
      ],
      successURL: "http://localhost:8080/success",
      cancelURL: "http://localhost:8080/error"
    };
  },
  methods: {
    submit() {
      this.$emit("customChange", 100)
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout().then(res => {
        console.log(res);
      });
    }
  }
};
</script>