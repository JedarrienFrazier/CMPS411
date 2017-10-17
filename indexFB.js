$(document).ready(function(){
    var rootRef = firebase.database().ref().child("Instruments");
    var add_row = document.getElementById("add_row"); 
    
    function addbtnClick(){
        var pushData = { }
        
        rootRef.push().set();
    }
    
    rootRef.on("child_added", snap =>{
        
        var type = snap.child("TYPE").val();
        var brand = snap.child("BRAND").val();
        var condition = snap.child("CONDITION").val();
        var mouthpiece = snap.child("HAS MOUTHPIECE").val();
        var notes = snap.child("NOTES").val();
        
        $('button').off().on('click',function () {
            var s = $(this).closest("tr").find(".nameq").text();
            $(this).closest('tr').remove();
            var query = rootRef.ref().child('Instruments').orderByKey();
            query.once("value")
                .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        var key = childSnapshot.key;
                        var childData = childSnapshot.child('TYPE').val();
                        if(childData==s) {
                            rootRef.ref().child('Instruments').child(key).remove();
                        }
                    });
                });
        });
        $('#table_body').append('<tr><td class="nameq">' + type + '</td><td>' + brand + '</td><td>' + condition + '</td><td>' + mouthpiece + '</td><td>' + notes + '</td><td><button>Remove</button></td></tr>');
    })
    
});