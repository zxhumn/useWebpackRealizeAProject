<template>
   <div>
    {{orderid}}
   </div>
</template>
<script>
    export default {
        data:function(){
            return {
                orderid:0,
            }
        },
        created(){
            this.orderid = this.$route.params.orderid;
        }
    }
</script>
<style>

</style>