angular
.module('tipJar')
.service('CurrentTransaction', CurrentTransaction)

function CurrentTransaction(){
  const self = this;
  self.transaction = '';
  self.setTransaction = (data) =>
  {
   self.transaction = data;
  //  console.log(self.transaction)
  };
  self.getTransaction = () =>
  {
    return self.transaction
  };
}
