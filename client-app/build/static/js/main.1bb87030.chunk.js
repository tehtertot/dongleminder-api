(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){e.exports=n(28)},20:function(e,t,n){},28:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(7),s=n.n(r),i=(n(20),n(1)),l=n(2),u=n(4),o=n(3),h=n(5),m=n(6),d=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return c.a.createElement("li",{className:"studentRow",value:this.props.value,onClick:function(){return e.props.onClick(e.props.value,e.props.name)}},this.props.name)}}]),t}(c.a.Component),p=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(o.a)(t).call(this,e))).state={allStudents:[],filteredStudents:[],searchFilter:""},fetch("http://localhost:5000/users",{method:"GET",crossDomain:!0}).then(function(e){return e.json()}).then(function(e){n.setState({allStudents:e,filteredStudents:e})}),n}return Object(h.a)(t,e),Object(l.a)(t,[{key:"handleChange",value:function(e){var t=e.toLowerCase(),n=this.state.allStudents.slice();n=n.filter(function(e){return e.full_name.toLowerCase().includes(t)}),this.setState({filteredStudents:n})}},{key:"render",value:function(){var e=this,t=this.state.filteredStudents.map(function(t){return c.a.createElement(d,{name:t.full_name,key:t.id,value:t.id,onClick:e.props.showStudent})});return c.a.createElement("div",{className:"search"},c.a.createElement("input",{placeholder:"search students...",onChange:function(t){return e.handleChange(t.target.value)}}),c.a.createElement("ul",{id:"studentList"},t))}}]),t}(c.a.Component),f=n(8),b=n.n(f),v=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(o.a)(t).call(this,e))).state={itemSelected:"",itemDesc:""},n.handleUpdate=n.handleUpdate.bind(Object(m.a)(Object(m.a)(n))),n.handleSubmit=n.handleCheckout.bind(Object(m.a)(Object(m.a)(n))),n}return Object(h.a)(t,e),Object(l.a)(t,[{key:"handleUpdate",value:function(e){var t=e.target.selectedIndex,n=e.target.options[t].text;n=n.substring(0,n.lastIndexOf("(")-1),this.setState({itemSelected:e.target.value,itemDesc:n})}},{key:"handleCheckout",value:function(e){var t=this;e.preventDefault(),this.props.studentId&&this.state.itemSelected&&fetch("http://localhost:5000/checkout/".concat(this.props.studentId,"/").concat(this.state.itemSelected),{method:"POST"}).then(function(){t.props.update(),t.setState({itemSelected:"",itemDesc:""})}).catch(function(){console.log("something went wrong")})}},{key:"render",value:function(){var e=this,t=this.props.allItems.map(function(e){return c.a.createElement("option",{key:e.id,value:e.id},e.description," (",e.available,")")});return c.a.createElement("form",{action:"/checkout",method:"POST",onSubmit:function(t){return e.handleCheckout(t)}},c.a.createElement("select",{className:"itemDropdown",onChange:function(t){return e.handleUpdate(t)},value:this.state.itemSelected?this.state.itemSelected:""},c.a.createElement("option",{value:""},"---please select an item---"),t),c.a.createElement(b.a,{variant:"success",size:"sm",type:"submit"},"Check Out"))}}]),t}(c.a.Component),j=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return c.a.createElement("form",{onSubmit:function(t){return e.props.checkin(t)}},c.a.createElement(b.a,{type:"submit",variant:"danger"},"return"))}}]),t}(c.a.Component),O=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"returnItem",value:function(e){var t=this;e.preventDefault();var n=this.props.item.id,a=this.props.student.id;fetch("http://localhost:5000/checkin/".concat(a,"/").concat(n),{method:"POST"}).then(function(){return t.props.update()}).catch(function(){console.log("something went wrong")})}},{key:"render",value:function(){var e=this,t=this.props.item,n=new Date(t.checkout_date);return n=n.toLocaleDateString("en-US"),c.a.createElement("tr",null,c.a.createElement("td",null,t.description),c.a.createElement("td",null,n),c.a.createElement("td",null,c.a.createElement(j,{checkin:function(t){return e.returnItem(t)},item:t.id})))}}]),t}(c.a.Component),E=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e,t=this;return this.props.student?(e=0===this.props.items.length?c.a.createElement("tr",null,c.a.createElement("td",{colSpan:"3"},"no checked out items")):this.props.items.map(function(e){return c.a.createElement(O,{key:e.id,item:e,student:t.props.student,update:t.props.update})}),c.a.createElement("table",{className:"itemsTable table text-center"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",{colSpan:"3"},"Items on Loan to ",this.props.student.full_name)),c.a.createElement("tr",null,c.a.createElement("th",null,"Item"),c.a.createElement("th",null,"Date Checked Out"),c.a.createElement("th",null,"Action"))),c.a.createElement("tbody",null,e,c.a.createElement("tr",null,c.a.createElement("td",{colSpan:"3"},c.a.createElement(v,{studentId:this.props.student.id,update:this.props.update,allItems:this.props.allItems})))))):c.a.createElement("p",{className:"itemsTable font-italic"},"Please select a student")}}]),t}(c.a.Component),k=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e,t=this.props.item;if(t.users){var n=t.users.map(function(e){return c.a.createElement("li",{key:e},e)});e=c.a.createElement("ul",null,n)}return c.a.createElement("div",{className:"itemInfo"},c.a.createElement("h6",null,t.description," (",t.count,")"),e,c.a.createElement("hr",null))}}]),t}(c.a.Component),y=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(o.a)(t).call(this,e))).state={items:[]},fetch("http://localhost:5000/items/detail",{method:"GET",crossDomain:!0}).then(function(e){return e.json()}).then(function(e){return n.setState({items:e})}),n}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state.items.map(function(e){return c.a.createElement(k,{key:e.id,item:e})});return c.a.createElement("div",{className:"container"},c.a.createElement("h3",null,"Dojo Inventory"),c.a.createElement("p",{className:"link",onClick:w},"View Students"),e)}}]),t}(c.a.Component),S=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(o.a)(t).call(this,e))).state={student:null,items:[],allItems:[]},n.updateTable=n.displayStudentItems.bind(Object(m.a)(Object(m.a)(n))),n}return Object(h.a)(t,e),Object(l.a)(t,[{key:"displayStudent",value:function(e){var t=this;fetch("http://localhost:5000/users/".concat(e),{method:"GET",crossDomain:!0}).then(function(e){return e.json()}).then(function(e){t.setState({student:e[0]}),t.displayStudentItems()})}},{key:"displayItemDropdown",value:function(){var e=this;fetch("http://localhost:5000/items",{method:"GET",crossDomain:!0}).then(function(e){return e.json()}).then(function(t){return e.setState({allItems:t})})}},{key:"displayStudentItems",value:function(){var e=this,t=this.state.student.id;fetch("http://localhost:5000/users/".concat(t,"/items"),{method:"GET",crossDomain:!0}).then(function(e){return e.json()}).then(function(t){e.setState({items:t}),e.displayItemDropdown()})}},{key:"switchView",value:function(){s.a.render(c.a.createElement(y,null),document.getElementById("root"))}},{key:"render",value:function(){return c.a.createElement("div",{className:"container"},c.a.createElement("h3",null,"Dojo Inventory"),c.a.createElement("p",{className:"link",onClick:this.switchView},"View All"),c.a.createElement(p,{showStudent:this.displayStudent.bind(this)}),c.a.createElement(E,{student:this.state.student,items:this.state.items,update:this.updateTable,allItems:this.state.allItems}))}}]),t}(c.a.Component);function w(){s.a.render(c.a.createElement(S,null),document.getElementById("root"))}n.d(t,"showMain",function(){return w}),w()}},[[14,2,1]]]);
//# sourceMappingURL=main.1bb87030.chunk.js.map