$(document).ready(()=>{
	ncbut = document.getElementById("ncbut")
	search_button = document.getElementById("search_button")
	query_category = document.getElementById("query_category")
	query_search = document.getElementById("query_search")
	search_result_row = document.getElementById("search_result_row")
	submit_button = document.getElementById("submit_button")

	var selected_id = null

	ncbut.onclick = ()=>{
		window.location.assign("/newcar")
	}

	/*Search Button*/

	search_button.onclick = ()=>{
		$.ajax({
			url: '/search',
			type: 'post',
			data: {
				searchQuery: query_search.value,
				searchType: query_category.value
			},
			success: (data) => {
				search_result_row.innerHTML = ""
				vehicles = data.data
				for (i = 0; i < vehicles.length; i++){

					newresult = document.createElement("tr");
					newresult.id = vehicles[i].cust_id + "_" + vehicles[i].vehicle_id
					newresult.className = "table-light"

					lname = document.createElement("td");
					lname.innerHTML = vehicles[i].last_name
					newresult.appendChild(lname);

					fname = document.createElement("td");
					fname.innerHTML = vehicles[i].first_name
					newresult.appendChild(fname);

					vmod = document.createElement("td");
					vmod.innerHTML = vehicles[i].model
					newresult.appendChild(vmod);

					license = document.createElement("td");
					license.innerHTML = vehicles[i].license
					newresult.appendChild(license);

					search_result_row.appendChild(newresult);

					newresult.onclick = function(){
						var x = document.getElementsByClassName('table-dark')
						if(x[0] !== undefined ){
							x[0].className = "table-light"
						}
						this.className = "table-dark"
						selected_id = this.id
					}
				}
			}
		})
	}

	/*Submit Button*/
	submit_button.onclick = () =>{
		$.ajax({
			url: '/submit',
			type: 'post',
			data: {
				selectedID: selected_id
			},
			success: (data) => {
				window.location.assign("/oldcar")
			}
		})
	}

})