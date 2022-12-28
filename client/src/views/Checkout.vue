<template>
  <div>
  <Checkout :fullName="this.fullName" :price="this.price" :plan="this.plan" :clientSecret="this.clientSecret" :subscriptionId="this.subscriptionId"  @PaymentSuccess="PaymentSuccess" @PaymentFail="PaymentFail"/>
  </div>
</template>
<script>
import Checkout from "../components/checkOutComponent.vue"
export default {
  components:{
    Checkout
  },
  data:()=>({
    fullName:null,
    price:null,
    plan:null,
    clientSecret:null,
    subscriptionId:null,
    paymentData:null
    
    
  }),
  mounted() {
    console.log(this.$attrs)
    this.fullName = this.$attrs.fullName
    this.price=this.$attrs.price
    this.plan=this.$attrs.plan
    this.clientSecret=this.$attrs.clientSecret
    this.subscriptionId=this.$attrs.subscriptionId
  },
  methods: {
    PaymentSuccess(data){
      this.paymentData=data
      console.log(data)

    },
    PaymentFail(data){
      this.paymentData=data
      console.log(data)

    }

  },
}
</script>