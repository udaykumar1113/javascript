var budgetController=(function(){

    //Modelling Income object
    var Income = function(id, description, value){
        this.id=id;
        this.description=description,
        this.value=value
    };
    
    //Modelling Expense object
    var Expense = function(id,description, value){
        this.id=id,
        this.description=description,
        this.value=value 
    };
    
    var data = {
        allItems:{
            exp:[],
            inc:[]    
        },
        totals:{
            exp:0,
            inc:0
        }
    };
    
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

//Global App controller
var controller=(function(budgetCtrl, UICtrl){

  var setupEventListener=function(){
      document.querySelector(DOMStrings.inputBtn).addEventListener('click',ctrlAddItem);
      
      document.addEventListener('keypress', function(event){
         if(event.keyCode===13 || event.which===13){
             ctrlAddItem();
         } 
      });
  }    
    
  var DOMStrings=UICtrl.getDOMStrings();
    
  var ctrlAddItem=function(){
      console.log(UICtrl.getInput());
  };  
  
  return{
      init: function(){
          setupEventListener();
      }
  }

})(budgetController,UIController);
income_expense_function
controller.init();