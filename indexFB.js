$(document).ready(function(){
    var rootRef = firebase.database().ref().child("Instruments");
    var add_row = document.getElementById("add_row");
    var globalID;
    
	function setID(id){
        globalID = id;
	}
    
    //on child_added event (see firebase doc), do things
    rootRef.on("child_added", snap =>{
        
        var type = snap.child("TYPE").val();
        var serial = snap.child("SERIAL").val();
        var brand = snap.child("BRAND").val();
        var condition = snap.child("CONDITION").val();
        var mouthpiece = snap.child("HAS MOUTHPIECE").val();
        var notes = snap.child("NOTES").val();
		var slu = snap.child("SLU").val();
		var make = snap.child("MAKE").val();
        var status = snap.child("STATUS").val();
		var key = snap.key;
        var test = status;
        
        if(status == ""){
            status = "Available";
        }
        
        //code for buttons
        $("h3").off().on('click',function() {
            if($("#addButton:hover").length > 0){
                modalAdd.open();
            }
        });
        $("tr").off().on('click',function() {
            var id = $(this).closest('tr').attr("id");
            rmid = "#rmbtn" + id;
            edid = "#edbtn" + id;
            //code for remove
            if($(rmid + ":hover").length > 0){
                $(this).closest('tr').remove();            //removes element from UI
			    rootRef.child(id).remove();                //removes entry from DB
            }
            //code for edit
            else if($(edid + ":hover").length > 0){
                modalEdit.open();                          //open modal
			    setID(id);			                       //pass off id to editBtnCLick method for..?
            }
        });
        //this code adds the data to the table
        $('#table_body').append('<tr id="'+ key +'"><td>' + serial + '</td><td>' + type + '</td><td>' + brand + '</td><td>' + condition + '</td><td>' + mouthpiece + '</td><td>' + notes + '</td><td>' + status + '</td><td><center><button class="btn btn-danger btn-sm" id="rmbtn' + key +'">Remove</button></center></td><td><center><button class="btn btn-info btn-sm" id = "edbtn' + key +'">Edit</button></center></td></tr>');
    })

//TINGLE MODAL CODE FOR EDIT BUTTON
    var modalEdit = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
        onOpen: function() {
            console.log('edit modal open');
            setEditModalContent();
        },
        onClose: function() {
            window.location.reload();
            console.log('edit modal closed');
        },
        beforeClose: function() {
            return true; // close the modal
        }
    });
    
    function setEditModalContent(){
        var id = globalID;
        var childRef = firebase.database().ref().child("Instruments").child(id);
        //vars for loading into edit
        childRef.on("value", snap => {
            var type = snap.child("TYPE").val();
            var serial = snap.child("SERIAL").val();
            var brand = snap.child("BRAND").val();
            var condition = snap.child("CONDITION").val();
            var mouthpiece = snap.child("HAS MOUTHPIECE").val();
            var notes = snap.child("NOTES").val();
            var slu = snap.child("SLU").val();
			var make = snap.child("MAKE").val();
            var status = snap.child("STATUS").val();
            
            modalEdit.setContent('<h3>Edit Details  </h3><form id="InstrumentForm"><div class="form-group"><div class="form-group"><label>Serial #</label><input class="form-control" id="talkSERIAL" value="'+ serial +'"></div><div class="form-group"><label>Type</label><input class="form-control" id="talkTYPE" value="'+ type +'"></div><label>Brand</label><input class="form-control" id="talkBRAND" value="'+ brand +'"></div><div class="form-group"><label>Condition</label><br><select id="talkCONDITION"><option value="'+ condition +'"></option><option value="New">New</option><option value="Good">Good</option><option value="Fine">Fine</option><option value="Works">Works</option><option value="Poor">Poor</option><option value="Bad">Bad</option><option value="???">???</option></select></div><div class="form-group"><label>Does the instrument have a mouthpiece?</label><br><select id="talkHASMOUTHPIECE"><option value="'+ mouthpiece +'"></option><option value="true">Yes</option><option value="false">No</option><option value="null">NA</option></select></div><div class="form-group"><label>Notes</label><input class="form-control" id="talkNOTES" value="'+ notes +'"><div class="form-group"><label>SLU</label><input class="form-control" id="talkSLU" value="'+ slu +'"><div class="form-group"><label>Make</label><input class="form-control" id="talkMAKE" value="'+ make +'"><div class="form-group"></div><div class="form-group"><label>Checked Out</label><input class="form-control" id="talkSTATUS" value="'+ status +'"> </div>');
          });
    }
    
    modalEdit.addFooterBtn('Submit', 'tingle-btn tingle-btn--primary', function() {
        // Reference to the Instruments object in your Firebase database
        var Instruments = firebase.database().ref("Instruments");
        
        // Get input values from each of the form elements
        var BRAND = $("#talkBRAND").val();
        var SERIAL = $("#talkSERIAL").val();
        var CONDITION = $("#talkCONDITION").val();
        var HASMOUTHPIECE = $("#talkHASMOUTHPIECE").val();
        var NOTES = $("#talkNOTES").val();
        var SLU = $("#talkSLU").val();
        var MAKE = $("#talkMAKE").val();
        var TYPE = $("#talkTYPE").val();
        var STATUS = $("#talkSTATUS").val();

        var updates = {};
        updates[globalID + '/BRAND'] = BRAND;
        updates[globalID + '/SERIAL'] = SERIAL;
        updates[globalID + '/CONDITION'] = CONDITION;
        updates[globalID + '/HAS MOUTHPIECE'] = HASMOUTHPIECE;
        updates[globalID + '/NOTES'] = NOTES;
        updates[globalID + '/SLU'] = SLU;
        updates[globalID + '/MAKE'] = MAKE;
        updates[globalID + '/TYPE'] = TYPE;
        updates[globalID + '/STATUS'] = STATUS;
        Instruments.update(updates);
       
        //Figure out how to make this update the html to match the updated database...
        Instruments.on("child_changed", function(snapshot) {
            alert("child changed!");
            // Get the Instrument data from the most recent snapshot of data
            // added to the Instruments list in Firebase
            Instrument = snapshot.val();
            // Update the HTML to display the Instrument text
            $("#BRAND").html(Instrument.BRAND)
            $("#SERIAL").html(Instrument.SERIAL)
            $("#CONDITION").html(Instrument.CONDITION)
            $("#HASMOUTHPIECE").html(Instrument.HASMOUTHPIECE)
            $("#NOTES").html(Instrument.NOTES)
            $("#SLU").html(Instrument.SLU)
            $("#MAKE").html(Instrument.MAKE)
            $("#TYPE").html(Instrument.TYPE)
            $("#STATUS").html(Instrument.STATUS)
        });
					
        modalEdit.close();
    });
//END MODAL EDIT CODE
//MODAL CODE FOR ADD BUTTON
    var modalAdd = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
        onOpen: function() {
            console.log('add modal open');
            setAddModalContent();
        },
        onClose: function() {
            console.log('add modal closed');
        },
        beforeClose: function() {
            return true; // close the modal
        }
    });
    function setAddModalContent(){
        modalAdd.setContent('<h3>Add Instrument</h3><form id="InstrumentForm"><div class="form-group"><div class="form-group"><label>Serial #</label><input class="form-control" id="talkSERIAL" placeholder="Serial #"></div><div class="form-group"><label>Type</label><input class="form-control" id="talkTYPE" placeholder="Instrument Type"></div><label>Brand</label><input class="form-control" id="talkBRAND" placeholder="Brand"></div><div class="form-group"><label>Condition</label><br><select id="talkCONDITION"><option></option><option value="New">New</option><option value="Good">Good</option><option value="Fine">Fine</option><option value="Works">Works</option><option value="Poor">Poor</option><option value="Bad">Bad</option><option value="???">???</option></select></div><div class="form-group"><label>Does the instrument have a mouthpiece?</label><br><select id="talkHASMOUTHPIECE"><option></option><option value="true">Yes</option><option value="false">No</option><option value="null">NA</option></select></div><div class="form-group"><label>Notes</label><input class="form-control" id="talkNOTES" placeholder="Notes"></div><div class="form-group"><label>SLU</label><input class="form-control" id="talkSLU" placeholder="SLU"><div class="form-group"><label>Make</label><input class="form-control" id="talkMAKE" placeholder="The make of the instrument"></div><div class="form-group"><label>Checked Out</label><input class="form-control" id="talkSTATUS" placeholder="In/Out"></div>');
    }
    modalAdd.addFooterBtn('Submit', 'tingle-btn tingle-btn--primary', function() {
        var Instruments = firebase.database().ref("Instruments");
        var BRAND = $("#talkBRAND").val();
        var SERIAL = $("#talkSERIAL").val();
        var CONDITION = $("#talkCONDITION").val();
        var HASMOUTHPIECE = $("#talkHASMOUTHPIECE").val();
        var NOTES = $("#talkNOTES").val();
        var SLU = $("#talkSLU").val();
        var MAKE = $("#talkMAKE").val();
        var TYPE = $("#talkTYPE").val();
        var STATUS = $("#talkSTATUS").val();
        Instruments.push({
            "BRAND": BRAND,
            "CONDITION": CONDITION,
            "HAS MOUTHPIECE": HASMOUTHPIECE,
            "NOTES": NOTES,
            "SLU": SLU,
            "MAKE": MAKE,
            "TYPE": TYPE,
            "SERIAL": SERIAL,
            "STATUS": STATUS
        });
        Instruments.limitToLast(1).on('child_added', function(childSnapshot) {
            // Get the Instrument data from the most recent snapshot of data
            // added to the Instruments list in Firebase
            Instrument = childSnapshot.val();
            // Update the HTML to display the Instrument text
            $("#BRAND").html(Instrument.BRAND)
            $("#SERIAL").html(Instrument.SERIAL)
            $("#CONDITION").html(Instrument.CONDITION)
            $("#HASMOUTHPIECE").html(Instrument.HASMOUTHPIECE)
            $("#NOTES").html(Instrument.NOTES)
            $("#SLU").html(Instrument.SLU)
            $("#MAKE").html(Instrument.MAKE)
            $("#TYPE").html(Instrument.TYPE)
            $("#STATUS").html(Instrument.STATUS)
        });
					
        modalAdd.close();
    });
//END MODAL ADD CODE
});