(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),c=t.n(o),u=(t(19),t(2)),i=function(e){var n=e.newSearch,t=e.searchChange;return r.a.createElement("div",null,"filter shown with:",r.a.createElement("input",{value:n,onChange:t}))},l=function(e){var n=e.persons,t=e.newSearch,a=e.deleteNumber,o=[];return function(){if(""===t)o=n;else{var e=n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())}));if(0===e.length)return r.a.createElement("div",null,"Person with the name ",t," was not found!");o=e}return o.map((function(e){return r.a.createElement("div",{key:e.name},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return a(e)},key:e.id},"delete"))}))}()},s=function(e){var n=e.persons,t=e.newName,a=e.newNumber,o=e.addPerson,c=e.changeName,u=e.changeNumber,i=e.updateNumber;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"add a new"),r.a.createElement("form",{onSubmit:function(e){var r=n.filter((function(e){return e.name===t})),c=n.filter((function(e){return e.number===a}));e.preventDefault(),1===r.length?i(r[0]):c.length>=1?alert("".concat(c[0].name," has already the number ").concat(a)):o()}},r.a.createElement("div",null,"name:",r.a.createElement("input",{value:t,onChange:c})),r.a.createElement("div",null,"number:",r.a.createElement("input",{value:a,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},m=function(e){var n=e.message,t=e.setMessage,a={color:"black",fontSize:12,padding:10,marginBottom:5},o=a;return o=e.error?{color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:5}:a,null===n?null:(setTimeout((function(){t(null)}),2500),r.a.createElement("div",{style:o},n))},f=t(3),d=t.n(f),h="/api/persons",g=function(){return d.a.get(h).then((function(e){return e.data}))},b=function(e){return d.a.post("".concat(h),e).then((function(e){return e.data}))},p=function(e,n){return d.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},w=function(e){return d.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},v=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),f=Object(u.a)(c,2),d=f[0],h=f[1],v=Object(a.useState)(""),E=Object(u.a)(v,2),N=E[0],S=E[1],j=Object(a.useState)(""),y=Object(u.a)(j,2),O=y[0],k=y[1],C=Object(a.useState)(""),P=Object(u.a)(C,2),D=P[0],A=P[1],B=Object(a.useState)(!1),L=Object(u.a)(B,2),z=L[0],J=L[1];Object(a.useEffect)((function(){g().then((function(e){return console.log("initial persons",e),console.log("response",e),o(e)})).catch((function(e){J(!0),A("Loading People from Database failed")})),J(!1),A("Loading People from Database successful!")}),[]);var M={name:d,number:N};return 0!==t.length?r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(i,{newSearch:O,searchChange:function(e){k(e.target.value)}}),r.a.createElement(s,{persons:t,newName:d,newNumber:N,setPersons:o,setNewName:h,setNewNumber:S,changeName:function(e){h(e.target.value)},changeNumber:function(e){S(e.target.value)},updateNumber:function(e){window.confirm("Are you shure you want to change the Number of ".concat(e.name," to ").concat(N,"?"))&&p(e.id,M).then((function(e){o(t.map((function(n){return n.id!==e.id?n:e}))),h(""),S("")})).catch((function(n){J(!0),A("Updating ".concat(e.name,"'s information failed!"))})),J(!1),A("Updating ".concat(e.name,"'s information successful!"))},addPerson:function(){b(M).then((function(e){o(t.concat(e)),h(""),S("")})).catch((function(e){J(!0),A("Adding ".concat(d," was not successful!"))})),J(!1),A("Adding ".concat(d," was successful!"))}}),r.a.createElement(m,{message:D,setMessage:A,error:z}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(l,{persons:t,newSearch:O,setPersons:o,deleteNumber:function(e){window.confirm("Are you shure you want to delete ".concat(e.name,"?"))&&w(e.id).then(o(t.filter((function(n){return n.id!==e.id})))).catch((function(n){J(!0),A("Deleting ".concat(e.name," failed!"))})),J(!1),A("Deleting ".concat(e.name," successful!"))}})):r.a.createElement("div",null,"loading... ")};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[14,1,2]]]);
//# sourceMappingURL=main.5b7a1144.chunk.js.map