$(document).ready(function(){
    console.log("ready");
    searchBut = document.getElementById("searchBut");
    searchBody = document.getElementById("searchBody");
    containerDiv = document.getElementById("container");
    
    
    searchBut.onclick = ()=>{
        searchBody.style.display = 'block';
        searchBody.style.width = '100vw';
        containerDiv.style.display = 'none'; 
        containerDiv.style.width = '0px';
	}
    
});