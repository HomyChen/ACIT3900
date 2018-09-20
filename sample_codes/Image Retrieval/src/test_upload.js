document.getElementById("upload").addEventListener("change", (event)=>{
	input = event.target
	var imageReader = new FileReader();
	imageReader.onload = function(){
      var dataURL = imageReader.result;
      var output = document.getElementById('show_file');
      output.src = dataURL;
    };
    imageReader.readAsDataURL(input.files[0]);
})