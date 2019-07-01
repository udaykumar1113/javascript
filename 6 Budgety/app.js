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
    
    //Data structure to store all income and expenditure
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
    
    return{
        addItem: function(type, des, val){
                        var newItem, ID;
            
            //[1 2 3 4 5], next ID = 6
            //[1 2 4 6 8], next ID = 9
            // ID = last ID + 1
            
            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            // Push it into our data structure
            data.allItems[type].push(newItem);
            
            // Return the new element
            return newItem;
        },
        testing:function(){
            console.log(data);
        }
        
    };
    
})();

var UIController=(function(){
    
    var DOMStrings={
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        inputBtn:'.add__btn',
        incomeContainer:'.income__list',
        expensesContainer:'.expenses__list'
    }
    
    return{
        getInput:function(){
            return{
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },
        
        addListItem:function(obj, type){
            
            
            var html, newHtml, element;
            //Create HTML string with placeholder text
            if(type==='inc')
                {
                    element=DOMStrings.incomeContainer;
                    html='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                }
            else 
              if(type='exp')
                {
                    element=DOMStrings.expensesContainer;
                    html='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                }
           
            //Replace placeholder text with actual data
              newHtml=html.replace('%id%',obj.id);
              newHtml=newHtml.replace('%description%',obj.description);
              newHtml=newHtml.replace('%value%',obj.value);
            
            //Insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeEnd',newHtml);
            
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
            
      //1.Get input
      var input=UICtrl.getInput();
      
      //2.Add item to budget controller
      var newItem=budgetCtrl.addItem(input.type, input.description, input.value);
      
      console.log(newItem);
      
      //3.Add the item to UI
      UICtrl.addListItem(newItem, input.type);
      
  }
  
  return{
      init: function(){
          setupEventListener();
      }
  }

})(budgetController,UIController);

controller.init();