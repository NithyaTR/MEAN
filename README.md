# MEAN
Practise following udemy sessions

The  custom tags defined in index.html. How does browser display it?
 - angular has a root module that is registered as "bootstrap" module. WHen the angular application is first started this module is linked (mentioned in main.ts)

{{}} => string interpolation
 () => event binding
 [] => property binding
 A # used to create a reference to an event that can be used in some other place in the template
 [()] => two way binding. the directive 'ngModel' will be used here. directive is a instruction given to a HTML element to indicate what has to be done with the element. for this, FormsModule package nees to be imported in app.module.ts

To install angular material, use 
npm install --save @angular/material
In latest CLIs, use ng add @angular/material
this adds two dependenies in package.json, angular/material and angular/cdk

Subject => special kind of observable
