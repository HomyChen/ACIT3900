$(document).ready(()=>{
	ncbut = document.getElementById("ncbut")
	search_button = document.getElementById("search_button")
	query_category = document.getElementById("query_category")
	query_search = document.getElementById("query_search")
	search_result_row = document.getElementById("search_result_row")
	submit_button = document.getElementById("submit_button")

    
    $('#searchTable').DataTable( {
        select: true
    } );
    
	var selected_id = null
    
    searchBody = document.getElementById("searchBody")
    
	ncbut.onclick = ()=>{
        window.location.assign("/")  
	}

	/*Search Button*/
    
    
    
    
	search_button.onclick = ()=>{
        $('#searchTable').DataTable().destroy();
		$.ajax({
			url: '/search',
			type: 'post',
			data: {
				searchQuery: query_search.value,
				searchType: query_category.value
			},
			success: (data) => {
                console.log(data);
                $('#searchTable').DataTable({
                    select: true,
                    data: data.data,
                    "columns": [
                        { "data": "last_name"},
                        { "data": "first_name"},
                        { "data": "model"},
                        { "data": "license"},
                    ]
                });
            }
		})
	}

	/*Submit Button*/
	submit_button.onclick = () =>{
        window.location.assign("/")   
	}

})