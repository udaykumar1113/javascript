var Person=function(name, birthYear, job){
    this.name=name,
    this.birtYear=birthYear,
    this.job=job
    this.calcAge=function(){
        console.log(2019-birthYear);
    }
}

var john=new Person('John',1980,'Manager');
var max=new Person('Max',1985,'Instructor');

console.log(john);
console.log(max);

john.calcAge();
max.calcAge();

