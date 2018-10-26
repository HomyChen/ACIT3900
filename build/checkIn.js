$(document).ready(function(){
    console.log("ready");
    searchBut = document.getElementById("searchBut");
    searchBody = document.getElementById("searchBody");
    containerDiv = document.getElementById("container");
    
    
    searchBut.onclick = ()=>{
        searchBody.style.display = 'block';
        
        containerDiv.style.display = 'none'; 
        
	}
    
});