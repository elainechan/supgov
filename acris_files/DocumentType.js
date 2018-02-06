//Search by Party name alert message
go_submit_none_type = 'Please select one document type to search';
go_submit_none_date = 'Please select a date range';
go_submit_more_31 = 'Specific Date range must not exceed 31 days.';

function initwindow() {
    
    var g = document.forms['global'];
    var d = document.forms['DATA'];   
    set_selected(d.combox_doc_doctype, g.hid_doctype.value);

    set_selected(d.cmb_date, g.hid_selectdate.value);

    if (g.hid_selectdate.value == 'DR') {
        d.edt_fromm.disabled = false;
        d.edt_fromd.disabled = false;
        d.edt_fromy.disabled = false;
        d.edt_tom.disabled = false;
        d.edt_tod.disabled = false;
        d.edt_toy.disabled = false;

        d.edt_fromm.value = g.hid_datefromm.value;
        d.edt_fromd.value = g.hid_datefromd.value;
        d.edt_fromy.value = g.hid_datefromy.value;
        d.edt_tom.value = g.hid_datetom.value;
        d.edt_tod.value = g.hid_datetod.value;
        d.edt_toy.value = g.hid_datetoy.value;
    }
    set_selected(d.borough, g.hid_borough.value);
    d.combox_doc_narrow.focus();
}

//-------------------------------------------
// Form DATA submit
//-------------------------------------------
function go_Submit() {
    trimAll();
    var d = document.forms['DATA'];
    var g = document.forms['global'];
    if (d.combox_doc_doctype.value == '') {
        window.alert(go_submit_none_type);
        d.combox_doc_doctype.focus();
        return;
    }

    if (d.cmb_date.value == "UN") {
        window.alert(go_submit_none_date);
        d.cmb_date.focus();
        return;
    }

    //----------------------
    // Put all data into global form
    //----------------------  
    g.hid_doctype.value = d.combox_doc_doctype.options[d.combox_doc_doctype.selectedIndex].value;
    g.hid_doctype_name.value = d.combox_doc_doctype.options[d.combox_doc_doctype.selectedIndex].text;   //(wst/020416)    
    g.hid_selectdate.value = d.cmb_date.options[d.cmb_date.selectedIndex].value;

    if (d.cmb_date.options[d.cmb_date.selectedIndex].value == 'DR') {

        if (!CheckDate())
        { return; }

        md1 = new Date(d.edt_fromy.value, d.edt_fromm.value - 1, d.edt_fromd.value);
        md2 = new Date(d.edt_toy.value, d.edt_tom.value - 1, d.edt_tod.value);
        if (md2.valueOf() - md1.valueOf() > (31 * 86400000)) {
            window.alert(go_submit_more_31);
            d.edt_tom.focus();
            return;
        }

        d.edt_fromm.disabled = false;
        d.edt_fromd.disabled = false;
        d.edt_fromy.disabled = false;
        d.edt_tom.disabled = false;
        d.edt_tod.disabled = false;
        d.edt_toy.disabled = false;

        g.hid_datefromm.value = d.edt_fromm.value;
        g.hid_datefromd.value = d.edt_fromd.value;
        g.hid_datefromy.value = d.edt_fromy.value;
        g.hid_datetom.value = d.edt_tom.value;
        g.hid_datetod.value = d.edt_tod.value;
        g.hid_datetoy.value = d.edt_toy.value;

        d.edt_fromm.disabled = true;
        d.edt_fromd.disabled = true;
        d.edt_fromy.disabled = true;
        d.edt_tom.disabled = true;
        d.edt_tod.disabled = true;
        d.edt_toy.disabled = true;
    }

    if (d.borough.selectedIndex == 0) {
        alert('Please select a Borough.');
        d.borough.focus();
        return;
    }

    ShowProgress();
    g.hid_borough.value = d.borough.options[d.borough.selectedIndex].value;
    g.hid_borough_name.value = d.borough.options[d.borough.selectedIndex].text;

    var URL = '/DS/DocumentSearch/DocumentTypeResult';
    g.action = URL;
    g.submit();
}

// This method used to load Document types.
function narrowDocType(str) {
    var sb = '<SELECT NAME="combox_doc_doctype"  class="normal" onFocus="fnNormalIn(event)" onBlur="fnNormalOut(event)">';
    sb = sb + '<option VALUE="" selected>Select a Document Type</option>';

    for (var i = 0; i < jsonDocumentTypes.length; i++) {
        if (str === jsonDocumentTypes[i].ClassCode || str === '') {
            sb = sb + '<option value="' + jsonDocumentTypes[i].Type + '">' + jsonDocumentTypes[i].Description + '</option>';
        }
    }
    document.getElementById("DocType").innerHTML = sb + '</SELECT>';
    document.forms['DATA'].combox_doc_doctype.focus();
}              