$(document).ready(function(){
    var rootRef = firebase.database().ref().child("Instruments");
    var add_row = document.getElementById("add_row");
    
    function addbtnClick(){
        var pushData = { }
        
        rootRef.push().set();
    }
	
	function editBtnClick(){
		
	}
    
    rootRef.on("child_added", snap =>{
        
        var type = snap.child("TYPE").val();
        var brand = snap.child("BRAND").val();
        var condition = snap.child("CONDITION").val();
        var mouthpiece = snap.child("HAS MOUTHPIECE").val();
        var notes = snap.child("NOTES").val();
		var key = snap.key;
		
		//remove button
        $('#removebtn').off().on('click',function () {
			var id = $(this).closest('tr').attr("id"); //retrieves the key from the id on tr element
            $(this).closest('tr').remove(); //removes element from UI
			rootRef.child(id).remove(); //removes from DB
			
			
        });
		
		//edit button
		$('#editbtn').off().on('click',function () {
			alert("EDIT!");
			var id = $(this).closest('tr').attr("id"); //retrieves the key from the id on tr element
			rootRef.child(id).update(); //removes from DB
			
			
        });
        $('#table_body').append('<tr id="'+ key +'"><td class="nameq">' + type + '</td><td>' + brand + '</td><td>' + condition + '</td><td>' + mouthpiece + '</td><td>' + notes + '</td><td><button id="removebtn">Remove</button></td><td><button id="editbtn">Edit</button></td></tr>');
    })
    
});