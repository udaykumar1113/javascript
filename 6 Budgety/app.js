var budgetController=(function(){

    //some code
})();

var UIController=(function(){
    
    var DOMStrings={
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        inputBtn:'.add__btn'
    }
    
    return{
        getInput:function(){
            return{
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },
        
        getDOMStrings:function(){
            return DOMStrings;
        }
    };    
})();

var controller=(function(budgetCtrl, UICtrl){

    
  var DOMStrings=UICtrl.getDOMStrings();
    
  var ctrlAddItem=function(){
      console.log(UICtrl.getInput());
  }  
  
  document.querySelector(DOMStrings.inputBtn).addEventListener('click',ctrlAddItem);

})(budgetController,UIController);