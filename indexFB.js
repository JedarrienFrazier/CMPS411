$(document).ready(function(){
    var rootRef = firebase.database().ref().child("Instruments");
    var add_row = document.getElementById("add_row");
    var globalID;
    
	function setID(id){
        globalID = id;
	}
    
    function onAddClick(){
        alert("success!");
        modalAdd.open();
    }
    
    //on child_added event (see firebase doc), do things
    rootRef.on("child_added", snap =>{
        
        var type = snap.child("TYPE").val();
        var brand = snap.child("BRAND").val();
        var condition = snap.child("CONDITION").val();
        var mouthpiece = snap.child("HAS MOUTHPIECE").val();
        var notes = snap.child("NOTES").val();
		var key = snap.key;
		//remove button
        $('button').off().on('click',function () {
			var id = $(this).closest('tr').attr("id"); //retrieves the key from the id on tr element
            $(this).closest('tr').remove();            //removes element from UI
			rootRef.child(id).remove();                //removes entry from DB
        });
		
		//edit button
		$('p').off().on('click',function () {
			var id = $(this).closest('tr').attr("id"); //retrieves the key from the id on tr element
            modalEdit.open();                          //open modal
			setID(id);			                       //pass off id to editBtnCLick method for..?
        });
        
        //this code adds
        $('#table_body').append('<tr id="'+ key +'"><td class="nameq">' + type + '</td><td>' + brand + '</td><td>' + condition + '</td><td>' + mouthpiece + '</td><td>' + notes + '</td><td><button id="button">Remove</button></td><td><p>EDIT</p></td></tr>');
    })

//TINGLE MODAL CODE FOR EDIT BUTTON
    var modalEdit = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
        onOpen: function() {
            console.log('modal open');
        },
        onClose: function() {
            window.location.reload();
            console.log('modal closed');
        },
        beforeClose: function() {
            return true; // close the modal
        }
    });
    
    // set content
    modalEdit.setContent('<h3>Add a new instrument</h3><form id="InstrumentForm"><div class="form-group"><label for="talkBRAND">Brand</label><input class="form-control" id="talkBRAND" placeholder="Brand of the instrument"></div><div class="form-group"><label for="talkCONDITION">Condition    </label><select id="talkCONDITION"><option value="" disabled selected>Select your option</option><option value="New">New</option><option value="Good">Good</option><option value="Fine">Fine</option><option value="Works">Works</option><option value="Poor">Poor</option><option value="Bad">Bad</option><option value="???">???</option></select></div><div class="form-group"><label for="talkHASMOUTHPIECE">Does the instrument have a mouthpiece?    </label><label><input type="radio" name="mouthPiece"  id="HASMOUTHPIECE_True" value="true" >Yes</label><label><input type="radio" name="mouthPiece" id="HASMOUTHPIECE_False" value="false" >No</label></div><div class="form-group"><label for="talkNOTES">Notes</label><input class="form-control" id="talkNOTES" placeholder="Notes on the current status of the instrument"></div><div class="form-group"><label for="talkTYPE">Type    </label><select id="talkTYPE"><option value="" disabled selected>Select your option</option><option value="Baritone">Baritone</option><option value="Tuba">Tuba</option><option value="Cornet">Cornet</option><option value="Euphonium">Euphonium</option><option value="Horn">Horn</option><option value="Mellophone">Mellophone</option><option value="Sousaphone">Sousaphone</option><option value="Trombone">Trombone</option><option value="Clarinet">Clarinet</option><option value="Flute">Flute</option><option value="Piccolo">Piccolo</option><option value="Saxophone">Saxophone</option><option value="Keyboard">Keyboard</option><option value="Percussion">Percussion</option></select></div>');
    
    /* TODO: 
        -CHANGE THIS TO UPDATE EXISTING
        -HAVE PREVIOUS VALUES LOADED IN
    */
    modalEdit.addFooterBtn('Submit', 'tingle-btn tingle-btn--primary', function() {
        // Reference to the Instruments object in your Firebase database
        var Instruments = firebase.database().ref("Instruments");
        
        // Get input values from each of the form elements
        var BRAND = $("#talkBRAND").val();
        var CONDITION = $("#talkCONDITION").val();
        var HASMOUTHPIECE
        if(document.getElementById('HASMOUTHPIECE_True').checked) {
            HASMOUTHPIECE = $("#HASMOUTHPIECE_True").val();
        }else if(document.getElementById('HASMOUTHPIECE_False').checked) {
            HASMOUTHPIECE = $("#HASMOUTHPIECE_False").val();
        } 
        var NOTES = $("#talkNOTES").val();
        var TYPE = $("#talkTYPE").val();
        
        
        var updates = {};
        updates['Instruments/' + globalID + '/BRAND'] = BRAND;
        updates['Instruments/' + globalID + '/CONDITION'] = CONDITION;
        updates['Instruments/' + globalID + '/HAS MOUTHPIECE'] = HASMOUTHPIECE;
        updates['Instruments/' + globalID + '/NOTES'] = NOTES;
        updates['Instruments/' + globalID + '/TYPE'] = TYPE;
        firebase.database().ref().update(updates);
        
        /* Get the single most recent Instrument from the database and
           update the table with its values. This is called every time the child_added
           event is triggered on the Instruments Firebase reference, which means
           that this will update EVEN IF you don't refresh the page. Magic.   */          
        Instruments.limitToLast(1).on('child_added', function(childSnapshot) {
            // Get the Instrument data from the most recent snapshot of data
            // added to the Instruments list in Firebase
            Instrument = childSnapshot.val();
            // Update the HTML to display the Instrument text
            $("#BRAND").html(Instrument.BRAND)
            $("#CONDITION").html(Instrument.CONDITION)
            $("#HASMOUTHPIECE").html(Instrument.HASMOUTHPIECE)
            $("#NOTES").html(Instrument.NOTES)
            $("#TYPE").html(Instrument.TYPE)
        });
					
        modalEdit.close();
    });
//END MODAL EDIT CODE
});