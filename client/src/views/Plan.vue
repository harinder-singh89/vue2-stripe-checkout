<template>
  <div>
  <Subscription :customerId="this.customerId" :priceId="this.priceId" :fullName="this.fullName" @createSubscriptionSuccess="createSubscriptionSuccess" @createSubscriptionFail="createSubscriptionFail"/>
  </div>
</template>
<script>
import Subscription from "../components/selectPlan.vue"
export default {
  components:{
    Subscription
  },
  data:()=>({
    customerId:null,
    fullName:null,
    priceId:null,
    subScriptionData:null

  }),
  mounted(){
    console.log(this.$attrs.fullName,this.$attrs.customerId,this.$attrs.priceId)
    this.customerId=this.$attrs.customerId
    this.priceId=this.$attrs.priceId
    this.fullName=this.$attrs.fullName

    console.log(this.customerId,this.fullName,this.priceId)
  },
  methods: {
    createSubscriptionSuccess(data){
      console.log(data)
      this.subScriptionData = data

    },
    createSubscriptionFail(data){
      console.log(data)
      this.subScriptionData = data

    }
  },
  
}
</script>