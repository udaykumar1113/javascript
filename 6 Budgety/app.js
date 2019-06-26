var budgetController=(function(){

    //some code
})();

var UIController=(function(){
    //UI related code
})();

var controller=(function(budgetCtrl, UICtrl){

    
  var ctrlAddItem=function(){
      console.log('Event listener works....')
  }    
 document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);
    
document.addEventListener('keypress', ctrlAddItem);

})(budgetController,UIController);