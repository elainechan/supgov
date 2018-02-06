/*
js\global.js
*/
//alert message in global js file

CheckDate_error_date = 'Invalid date. Please enter again.';
CheckDate_error_day = 'Invalid day. Please enter again.';
CheckDate_error_month = 'Invalid month. Please enter again.';
CheckDate_null_year = 'Please enter year.';
CheckDate_28_day = 'There are only 28 days in this month. Please enter again.';
var PWindow;
var isNav, isIE;

if (parseInt(navigator.appVersion.charAt(0)) >= 4) {
    isNav = (navigator.appName == "Netscape") ? true : false;    
    isIE = (navigator.appName == "Microsoft Internet Explorer") ? true : false;
}

// Set Pointer in hourglass mode LE.Gomez
function setPointer() {
    if (document.all)
        for (var i = 0; i < document.all.length; i++) document.all(i).style.cursor = 'wait';
}
// Set Pointer in default mode LE.Gomez	
function resetPointer() {
    if (document.all)
        for (var i = 0; i < document.all.length; i++) document.all(i).style.cursor = 'default';
}

//------------------------------------
// Function : Get_Error()
//------------------------------------

function get_error() {
    var err = '';

    for (i = 0; i < document.forms.length; i++) {
        if (document.forms[i].hid_error != null) {
            if (document.forms[i].hid_error.length == null)
                err = document.forms[i].hid_error.value;
            else
                err = document.forms[i].hid_error[0].value;
            return err;
        }
    }
    return '';
}

//--------------------------------------
// Function: Set_Selected()
//--------------------------------------
function set_selected(sel, val) {

    var i = 0;
    for (i = 0; i < sel.options.length; i++) {
        if (sel.options[i].value == val) {
            break;
        }
    }
    if (i >= sel.options.length) i = 0;
    else sel.options[i].selected = true;

}

//--------------------------------------------
// Fliter all text
//--------------------------------------------
function trim(str) {
    while (str.indexOf(' ') == 0) str = str.replace(' ', '');
    while (str.charAt(str.length - 1) == ' ') str = str.substring(0, str.length - 1);
    return str;
}

function trimAll() {
    var i, j;
    for (i = 0; i < document.forms.length; i++) {
        var curform = document.forms[i];
        for (j = 0; j > curform.elements.length; j++) {
            if (curform.elements[j].type == 'text' || curform.elements[j].type == 'password')
                curform.elements[j].value = trim(curform.elements[j].value);
        }
    }
}

//-------------------------
//Is the string a number?
//-------------------------
function IsANum(str) {
    for (var i = 0; i < str.length; i++) {
        var ch = str.substring(i, i + 1);
        if (ch < "0" || ch > "9") {
            return false;
        }
    }
    return true;
}

//----------------------------------------------
// Do with Data about search by: PName , BBL, DocType
//----------------------------------------------
function EnbDate() {
    var d = document.forms['DATA'];
    if (d.cmb_date.options[d.cmb_date.selectedIndex].value == "DR") {
        d.edt_fromm.disabled = false;
        d.edt_fromd.disabled = false;
        d.edt_fromy.disabled = false;
        d.edt_tom.disabled = false;
        d.edt_tod.disabled = false;
        d.edt_toy.disabled = false;
    } else {
        d.edt_fromm.disabled = true;
        d.edt_fromd.disabled = true;
        d.edt_fromy.disabled = true;
        d.edt_tom.disabled = true;
        d.edt_tod.disabled = true;
        d.edt_toy.disabled = true;

        d.edt_fromm.value = '';
        d.edt_fromd.value = '';
        d.edt_fromy.value = '';
        d.edt_tom.value = '';
        d.edt_tod.value = '';
        d.edt_toy.value = '';
    }
}

function upcase_name(obj) //make the inputed name to be capitalized(wst/020415)
{
    obj.value = obj.value.toUpperCase();
}

function CheckField(field) { //v1.0  
    var d = document.forms['DATA'];
    var baction;
    baction = (field.value == "0000") ? true : false;    
    if (baction) {        
        d.edt_fromd.style.background = "#DBDBDB";
        d.edt_fromm.style.background = "#DBDBDB";
        d.edt_fromy.style.background = "#DBDBDB";
        d.edt_tod.style.background = "#DBDBDB";
        d.edt_tom.style.background = "#DBDBDB";
        d.edt_toy.style.background = "#DBDBDB";
        d.edt_unit.style.background = "#DBDBDB";

        d.edt_fromd.disabled = true;
        d.edt_fromm.disabled = true;
        d.edt_fromy.disabled = true;
        d.edt_tod.disabled = true;
        d.edt_toy.disabled = true;
        d.edt_tom.disabled = true;
        d.cmb_date.disabled = true;
        d.combox_doc_doctype.disabled = true;        
        d.edt_unit.disabled = true;
    } else {
        d.edt_fromd.style.background = "#FFFFFF";
        d.edt_fromm.style.background = "#FFFFFF";
        d.edt_fromy.style.background = "#FFFFFF";
        d.edt_tod.style.background = "#FFFFFF";
        d.edt_tom.style.background = "#FFFFFF";
        d.edt_toy.style.background = "#FFFFFF";
        d.edt_unit.style.background = "#FFFFFF";

        d.cmb_date.disabled = false;
        d.combox_doc_doctype.disabled = false;        
        d.edt_unit.disabled = false;
    }
}

function formatdate(obj) {
    var d = document.forms['DATA'];

    if (!IsANum(obj.value) && (obj.value != '')) {
        window.alert(CheckDate_error_date);
        obj.focus();
        obj.select();
        return false;
    }

    if ((obj.value == 0) && (obj.value != '')) {
        window.alert(CheckDate_error_date);
        obj.focus();
        obj.select();
        return false;
    }

    if ((obj.name == 'edt_tom') || (obj.name == 'edt_fromm') || (obj.name == 'edt_fromd') || (obj.name == 'edt_tod')) {
        if (obj.value.length == 1) {
            obj.value = '0' + obj.value;
        }
    }
    if ((obj.name == 'edt_toy') || (obj.name == 'edt_fromy')) {
        if (obj.value.length == 1)
        { obj.value = '200' + obj.value; }
        if (obj.value.length == 2)
        { obj.value = '20' + obj.value; }
        if (obj.value.length == 3)
        { obj.value = '2' + obj.value; }
    }
    if ((d.edt_tod.value != '') && (d.edt_tom.value != '') && (d.edt_toy.value != '') && (d.edt_fromd.value != '') && (d.edt_fromm.value != '') && (d.edt_fromy.value != '')) {
        if ((d.edt_toy.value + d.edt_tom.value + d.edt_tod.value) < (d.edt_fromy.value + d.edt_fromm.value + d.edt_fromd.value)) //change value if from date is later than to date
        {
            t_tod = d.edt_tod.value;
            t_tom = d.edt_tom.value;
            t_toy = d.edt_toy.value;
            d.edt_tod.value = d.edt_fromd.value;
            d.edt_tom.value = d.edt_fromm.value;
            d.edt_toy.value = d.edt_fromy.value;
            d.edt_fromd.value = t_tod;
            d.edt_fromm.value = t_tom;
            d.edt_fromy.value = t_toy;
        }
    }
}

function CheckDate() {
    var d = document.forms['DATA'];

    if ((d.edt_fromm.value > 12) || (d.edt_fromm.value == 0)) {

        d.edt_fromm.focus();
        d.edt_fromm.select();
        window.alert(CheckDate_error_month); 
        return false;
    }

    if ((d.edt_fromd.value > 31) || (d.edt_fromd.value == 0)) {        
        d.edt_fromd.focus();
        d.edt_fromd.select();
        window.alert(CheckDate_error_day); 
        return false;
    }

    if (d.edt_fromy.value == '') {
        window.alert(CheckDate_null_year);
        d.edt_fromy.focus();
        d.edt_fromy.select();
        return false;
    }

    if ((d.edt_tom.value > 12) || (d.edt_tom.value == 0)) {
        window.alert(CheckDate_error_month);
        d.edt_tom.focus();
        d.edt_tom.select();
        return false;
    }

    if ((d.edt_tod.value > 31) || (d.edt_tod.value == 0)) {
        window.alert(CheckDate_error_day);
        d.edt_tod.focus();
        d.edt_tod.select();
        return false;
    }

    if (d.edt_toy.value == '') {
        window.alert(CheckDate_null_year);
        d.edt_toy.focus();
        d.edt_toy.select();
        return false;
    }

    if ((d.edt_fromm.value == 2) && (d.edt_fromd.value > 29)) {
        window.alert(CheckDate_error_day);
        d.edt_fromd.focus();
        d.edt_fromd.select();
        return false;
    }

    if ((d.edt_tom.value == 2) && (d.edt_tod.value > 29)) {
        window.alert(CheckDate_error_day);
        d.edt_tod.focus();
        d.edt_tod.select();
        return false;
    }

    if (((d.edt_tom.value == 4) || (d.edt_tom.value == 6) || (d.edt_tom.value == 9) || (d.edt_tom.value == 11)) && (d.edt_tod.value > 30)) {
        window.alert(CheckDate_error_day);
        d.edt_tod.focus();
        d.edt_tod.select();
        return false;
    }
    if (((d.edt_fromm.value == 4) || (d.edt_fromm.value == 6) || (d.edt_fromm.value == 9) || (d.edt_fromm.value == 11)) && (d.edt_fromd.value > 30)) {
        window.alert(CheckDate_error_day);
        d.edt_fromd.focus();
        d.edt_fromd.select();
        return false;
    }
    if ((!(LeapYear(d.edt_toy.value))) && (d.edt_tom.value == 2) && (d.edt_tod.value > 28)) {
        window.alert(CheckDate_28_day);
        d.edt_tod.focus();
        d.edt_tod.select();
        return false;
    }
    if ((!(LeapYear(d.edt_fromy.value))) && (d.edt_fromm.value == 2) && (d.edt_fromd.value > 28)) {
        window.alert(CheckDate_28_day);
        d.edt_fromd.focus();
        d.edt_fromd.select();
        return false;
    }
    else {
        return true;
    }

}

function disabledate() {
    var d = document.forms['DATA'];
    d.edt_fromm.disabled = true;
    d.edt_fromd.disabled = true;
    d.edt_fromy.disabled = true;
    d.edt_tom.disabled = true;
    d.edt_tod.disabled = true;
    d.edt_toy.disabled = true;
}

function LeapYear(intYear) {
    if (intYear % 100 == 0) {
        if (intYear % 400 == 0) { return true; }
    }
    else {
        if ((intYear % 4) == 0) { return true; }
    }
    return false;
}

function ShowProgress() {
    Sprogress = window.open('/DS/DocumentSearch/Process', '_blank', 'resizable=yes,width=350,height=200')
    Sprogress.moveTo(screen.availWidth / 2 - 200, screen.availHeight / 2 - 100);
    PWindow = Sprogress;
}

function CloseProgress() {
    if (PWindow != null)
        PWindow.close();
}

function fwLoadMenus(inctx) { // Loads the dropdown menu in to the page   
    if (window.fw_menu_0) return;

    if (inctx == null)
        xurl = "/AcrisHelp/docsearch/default.htm"
    else
        xurl = "/AcrisHelp/docsearch/#?id=" + inctx;

    window.fw_menu_0 = new Menu("root", 156, 19, "Verdana, Arial, Helvetica,sans-serif", 12, "#ffffff", "#000000", "#3333aa", "#99ccff");
    fw_menu_0.addMenuItem("Contents and Index", "window.open(xurl,'_blank','resizable=yes,width=800,height=600');");
    fw_menu_0.addMenuItem("About ACRIS", "window.open('/DS/DocumentSearch/AboutAcris#aboutacris', '_blank','toolbar=0,menubar=0,status=1,scrollbars=1,resizable=1,top=5,left=5,width=950,height=680');");
    fw_menu_0.addMenuItem("About City Register", "window.open('/DS/DocumentSearch/AboutCR','_blank','resizable=yes,width=800,height=600');");

    fw_menu_0.fontWeight = "bold";
    fw_menu_0.hideOnMouseOut = true;
    fw_menu_0.writeMenus();
}

function go_print(PrintType) {
    var g = document.forms['global'];
    var print_url = '/DS/Print/print?printType=' + PrintType;

    if (PrintType == 'Detail') {
        print_url = print_url + '&doc_id=' + g.hid_DocID.value;
    }
    g.action = print_url;
    g.submit();
}

function go_detail(doc_id) {
    var g = document.forms['global'];
    if (doc_id == '') {
        if (g.hid_DocID.value != '')
            doc_id = g.hid_DocID.value;
        else
            doc_id = g.DocID.value;
    }
    g.action = '/DS/DocumentSearch/DocumentDetail?doc_id=' + doc_id;
    g.target = '_top';
    g.submit();
}

function go_image(doc_id) {
    var g = document.forms['global'];
    if (doc_id == 0) {
        if (g.hid_DocID.value != '')
            doc_id = g.hid_DocID.value;
        else
            doc_id = g.DocID.value;
    }
    g.action = '/DS/DocumentSearch/DocumentImageView?doc_id=' + doc_id;
    g.submit();
}

function go_result(ResultType) {
    var g = document.forms['global'];
    var qRest = '';

    if (ResultType == '0') {
        ResultType = g.hid_SearchType.value + 'Result';
    }

    if (g.hid_page.value != '') {
        qRest = '?page=' + g.hid_page.value;
    }
    g.action = '/DS/DocumentSearch/' + ResultType + qRest;
    g.target = '_top';
    g.submit();
}

function go_searchoption() {
    var g = document.forms['global'];
    g.action = '/DS/DocumentSearch/Index';
    g.target = '_top';
    g.submit();
}

function cancel_print() {
    var g = document.forms['global'];
    var qRest = '';
    var act = '';
    if (g.hid_page.value != '') {
        qRest = 'page=' + g.hid_page.value;
        if (g.hid_PrintType.value == 'Result') {
            act = '?';
        }
        else {
            act = '&';
        }
    }
    qRest = act + qRest;

    if (g.hid_PrintType.value == 'Result') {
        var hidSearchType = g.hid_SearchType.value;
        if (hidSearchType.toUpperCase() == "TRANSID") {
            hidSearchType = "TransactionNumber";
        }
        if (hidSearchType.toUpperCase() == "DOCTYPE") {
            hidSearchType = "DocumentType";
        }    

        var to_url = '/DS/DocumentSearch/' + hidSearchType + 'Result' + qRest;
    } else
        if (g.hid_PrintType.value == 'Image') {
            var to_url = '/DS/DocumentSearch/DocumentImageView?doc_id=' + g.hid_DocID.value + qRest;
        } else
            if (g.hid_PrintType.value == 'Detail') {
                var to_url = '/DS/DocumentSearch/DocumentDetail?doc_id=' + g.hid_DocID.value + qRest;
            }
            g.hid_ReqID.value = '';
            if (to_url == null) {
                g.action = '/DS/DocumentSearch/Index';                
            }
            else {
                g.action = to_url;
            }
    g.submit();

}

function upcase(obj) {
    obj.value = obj.value.toUpperCase();
}

function fnUpperIn(evt) {
    var e;
    if (isNav)
        e = evt.target;
    else if (isIE)
        e = event.srcElement;
    else
        return false;

    e.className = "upperaccessible";
    if (e.type == "text")
        e.select();
}

function fnUpperOut(evt) {
    var e;
    if (isNav)
        e = evt.target;
    else if (isIE)
        e = event.srcElement;
    else
        return false;
    e.className = "uppernormal";
}

function fnNormalIn(evt) {
    var e;
    if (isNav)
        e = evt.target;
    else if (isIE)
        e = event.srcElement;
    else
        return false;
    e.className = "accessible";
    if ((e.type == "text") || (e.type == "password"))
        e.select();
}

function fnNormalOut(evt) {
    var e;
    if (isNav)
        e = evt.target;
    else if (isIE)
        e = event.srcElement;
    else
        return false;
    e.className = "normal";
}

function fnRightIn(evt) {
    var e;
    if (isNav)
        e = evt.target;
    else if (isIE)
        e = event.srcElement;
    else
        return false;
    e.className = "rightaccessible";
    if (e.type == "text")
        e.select();
}

function fnRightOut(evt) {
    var e;
    if (isNav)
        e = evt.target;
    else if (isIE)
        e = event.srcElement;
    else
        return false;
    e.className = "rightnormal";
}

function leftPad(str, len) {
    var s = str;
    while (s.length < len) s = ' ' + s;
    return s;
}

function isNull(str) {
    str = trim(str);
    if ((str == null) || (str.length == 0)) return true;
    else return false;
}

function MLC_callMenu() {  
    //Calculates the position of the help button, so the dropdown menu allways is going
    var ImageLeftTop;
    var ImageTop;
    ImageLeftTop = (MLC_getLeftIE(CELL) + 7);
    ImageTop = (MLC_getTopIE(CELL) + 16);
    
    window.FW_showMenu(window.fw_menu_0, ImageLeftTop, ImageTop);
}

function MLC_getLeftIE(img_ref) {
    //Returns the RELATIVE left position for an object
    var left = 0;

    do
        left += img_ref.offsetLeft;
    while ((img_ref = img_ref.offsetParent));
    left = left + 1;
    return left;
}

function MLC_getTopIE(img_ref) {
    //Returns the RELATIVE Top position for an object
    var top = 0;

    do
        top += img_ref.offsetTop;
    while ((img_ref = img_ref.offsetParent));
    top = top + 3;
    return top;
}



function MM_findObj(n, d) { //v4.0
    var p, i, x; if (!d) d = document; if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document; n = n.substring(0, p);
    }
    if (!(x = d[n]) && d.all) x = d.all[n]; for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
    for (i = 0; !x && d.layers && i < d.layers.length; i++) x = MM_findObj(n, d.layers[i].document);
    if (!x && document.getElementById) x = document.getElementById(n); return x;
}

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
    if (init == true) with (navigator) {
        if ((appName == "Netscape") && (parseInt(appVersion) == 4)) {
            document.MM_pgW = innerWidth; document.MM_pgH = innerHeight; onresize = MM_reloadPage;
        }
    }
    else if (innerWidth != document.MM_pgW || innerHeight != document.MM_pgH) location.reload();
}
MM_reloadPage(true);

function MM_showHideLayers() { //v3.0
    var i, p, v, obj, args = MM_showHideLayers.arguments;
    for (i = 0; i < (args.length - 2); i += 3) if ((obj = MM_findObj(args[i])) != null) {
        v = args[i + 2];
        if (obj.style) { obj = obj.style; v = (v == 'show') ? 'visible' : (v = 'hide') ? 'hidden' : v; }
        obj.visibility = v;
    }
}

function tmt_winHistory(id, s) {
    var d = eval(id) == null || eval(id + ".closed");
    if (!d) { eval(id + ".history.go(" + s + ")"); }
}

function MLC_ValidateState() {
    var args = MLC_ValidateState.arguments;
    var myForm = MM_findObj(args[0]);
    var InputField = '<select name="cmb_states"  tabindex="16" class="normal" onFocus="fnNormalIn(event)" onBlur="fnNormalOut(event)"><Option value="" selected>Choose a state <Option value="AL">ALABAMA <Option value="AK">ALASKA <Option value="AZ">ARIZONA <Option value="AR">ARKANSAS <Option value="CA">CALIFORNIA <Option value="CO">COLORADO <Option value="CT">CONNECTICUT <Option value="DE">DELAWARE <Option value="FL">FLORIDA <Option value="GA">GEORGIA <Option value="HI">HAWAII <Option value="ID">IDAHO <Option value="IL">ILLINOIS <Option value="IN">INDIANA <Option value="IA">IOWA <Option value="KS">KANSAS <Option value="KY">KENTUCKY <Option value="LA">LOUISIANA <Option value="ME">MAINE <Option value="MD">MARYLAND <Option value="MA">MASSACHUSETTS <Option value="MI">MICHIGAN <Option value="MN">MINNESOTA <Option value="MS">MISSISSIPPI <Option value="MO">MISSOURI <Option value="MT">MONTANA <Option value="NE">NEBRASKA <Option value="NV">NEVADA <Option value="NH">NEW HAMPSHIRE <Option value="NJ">NEW JERSEY <Option value="NM">NEW MEXICO <Option value="NY">NEW YORK <Option value="NC">NORTH CAROLINA <Option value="ND">NORTH DAKOTA <Option value="OH">OHIO <Option value="OK">OKLAHOMA <Option value="OR">OREGON <Option value="PA">PENNSYLVANIA <Option value="RI">RHODE ISLAND <Option value="SC">SOUTH CAROLINA <Option value="SD">SOUTH DAKOTA <Option value="TN">TENNESSEE <Option value="TX">TEXAS <Option value="UT">UTAH <Option value="VT">VERMONT <Option value="VA">VIRGINIA <Option value="WA">WASHINGTON <Option value="DC">WASHINGTON, D.C. <Option value="WV">WEST VIRGINIA <Option value="WI">WISCONSIN <Option value="WY">WYOMING</select>';
    var StateFlag = 'DESC_State';
    var ZipFlag = 'DESC_Zip';
    if ((myForm.value != 'US') && (MLC_ValidateState.arguments[1] == 'cmb_country')) {
        document.getElementById('stat1').innerHTML = '<font size=2 face="Verdana, Arial, Helvetica, sans-serif"><b><font color="#000000">Province / State:</font></b></font>';
        document.getElementById('stat2').innerHTML = '<input type="text" name="edt_state" maxlength="30"  onfocus="fnUpperIn(event)" onblur="fnUpperOut(event)" onchange="upcase(this)" tabindex="16">';

    } else {
        document.getElementById('stat1').innerHTML = '<font size=2 face="Verdana, Arial, Helvetica, sans-serif"><b><font color="#000000">State:&nbsp</font></b></font>';
        document.getElementById('stat2').innerHTML = InputField;
    }

    if ((myForm.value == 'other') && (MLC_ValidateState.arguments[1] == 'cmb_country')) {
        document.getElementById('OtherCountry').innerHTML = '<input type="text" name="edt_other" maxlength="30" onfocus="fnUpperIn(event)" onblur="fnUpperOut(event)" onchange="upcase(this)" tabindex="14">';
    } else {
        document.getElementById('OtherCountry').innerHTML = '&nbsp';
    }
}

function log_off(coverpagemainurl) {
    var g = document.forms['form_global'];
    //clear_cookies();
    g.action = coverpagemainurl;    
    g.submit();
}

function finished(coverpagemainurl, coverpageloginurl) {
    var g = document.forms['form_global'];
    if ((!g.hid_customerid) || (g.hid_customerid.value == ''))
        g.action = coverpagemainurl;
    else
        g.action = coverpageloginurl; 
    if (g.hid_type != undefined)
        g.hid_type.value = '';
    g.submit();
}

function clear_cookies() {
    var cookie;
    cookie = new Cookie(document, 'sy_pro');
    cookie.remove();
    cookie = new Cookie(document, 'sy_ref');
    cookie.remove();
    cookie = new Cookie(document, 'sy_par');
    cookie.remove();
    cookie = new Cookie(document, 'sy_par1');
    cookie.remove();
    cookie = new Cookie(document, 'sy_par2');
    cookie.remove();
    cookie = new Cookie(document, 'sy_par3');
    cookie.remove();
}
