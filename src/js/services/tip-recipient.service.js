angular
.module('tipJar')
.service('TipRecipient', TipRecipient)

function TipRecipient(){
  const self = this;
  self.recipient = '';
  self.setRecipient = (data) =>
  {
    return self.recipient = data;
  }
  self.getRecipient = () =>
  {
    return self.recipient
  }
}
