<template>
  <div>
    
    <Customer @customerCreationSuccess="customerCreationSuccess" @customerCreationFail="customerCreationFail" />
  </div>
</template>
<script>
import Customer from '../components/createCustomer.vue'
export default{
  components:{
    Customer
  },
  data:()=>({
    customerId:null

  }),
  methods: {
    customerCreationSuccess(customer){
      console.log(customer)
      this.customerId=customer
      window.alert(customer)

    },
    customerCreationFail(error){
      console.log(error)
      this.customerId=error
      window.alert(error)
    }
  },

}
</script>
