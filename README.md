# MEAN
Practise following udemy sessions

The  custom tags defined in index.html. How does browser display it?
 - angular has a root module that is registered as "bootstrap" module. WHen the angular application is first started this module is linked (mentioned in main.ts)

{{}} => string interpolation
 () => event binding
 [] => property binding
 A  # used to create a reference to an event that can be used in some other place in the template
 [()] => two way binding. the directive 'ngModel' will be used here. directive is a instruction given to a HTML element to indicate what has to be done with the element. for this, FormsModule package nees to be imported in app.module.ts

To install angular material, use 
npm install --save @angular/material
In latest CLIs, use ng add @angular/material
this adds two dependenies in package.json, angular/material and angular/cdk

Subject => special kind of observable

Reactive forms
---------------
- when you use more than one input in the form i.e, more than one form control, dont use set value directly. use 
this.modalFG.controls['jobStatus'].setValue(0);
instead of 
this.modalFG.setValue({'comment': data.comment});

Lazy loading
------------
1) router is managed globally. So there is no need to export the modules.
2) router can be used to load components ly when we need them. this is called lazy loading. 
for ex: 
signup and signin is not always needed!
This improves performance.

split the routes module-wise. declare them as 'forChild' and in the main (root) route include the auth.module (since it has login and signup code) using property 'loadChildren' instead of 'component'.

Deploying
---------
1) deploy the frontend and backend apps separately. 
use firebase for UI?
aws - elastic bean stalk (use as host for dynamic content) - create application.
deploy angular using s3 (use as host for static content) 
    - grant read only permission to an anonimous user. 
    - enable static web site hoting.
2) use node js app to serve both front end and backend. (CORS headers can be avoided)
- add a separate route for angular inside backend code.
- build code for production and place inside backend code.
- render index.html when the defined route is hit.