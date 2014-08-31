function parseDebugFlag()
{
    var body = document.getElementsByTagName("body")[0];
    return body.getAttribute("data-debug") == "true";
};

function markError()
{
    var body = document.getElementsByTagName("body")[0];
    body.setAttribute("data-error", "true");
};

function handleError(error)
{
    console.log(error);
    markError();
};

function loadXMLDoc(filename)
{
    if (window.XMLHttpRequest) {
        xhttp=new XMLHttpRequest();
    } else {
        // code for IE5 and IE6
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET",filename,false);
    xhttp.send();
    return xhttp.responseXML;
};

var sideMenuTree = null;
var sideMenuItemID = 0;

function getBackButton(imgUrl, id)
{
    var node = document.createElement("li");
    node.setAttribute("id", "BACK");
    node.setAttribute("data-parent", id);
    var link = document.createElement("a");
    link.setAttribute("class", "menu");
    var label = null;
    if (imgUrl) {
        label = document.createElement("img");
        label.setAttribute("src", imgUrl);
    } else {
        label = document.createTextNode("Back");
    }
    link.appendChild(label);
    node.appendChild(link);
    return node;
}

function getPureNode(object)
{
    var copy = object.cloneNode(true);
    if (!hasChildNodes(copy))
        return copy;
    for (var i = copy.childNodes.length - 1; i >= 0; i--) {
        var child = copy.childNodes.item(i);
        if (child.nodeName == "LI")
            copy.removeChild(child);
    }
    return copy;
};

function hasChildNodes(object)
{
    for (var i = 0; i < object.childNodes.length; i++) {
        var child = object.childNodes.item(i);
        if (child.nodeName == "LI")
            return true;
    }
    return false;
}

        
function getNodeById(object, id)
{
    if (object == null || id == null) {
        handleError("Invalid argument passed!");
        return null;
    }
    if (object.nodeType != 1)
        return null;

    if (object.getAttribute("id") == id)
        return object;

    if (object.hasChildNodes())
        for (var j = 0; j < object.childNodes.length; j++) {
            var node = getNodeById(object.childNodes.item(j), id);
            if (node != null)
                return node;
        }
    return null;
};

function attachLevelById(id)
{
    if (id < 0) {
        handleError("Invalid argument passed!");
        return;
    }
    return getNodeById(sideMenuTree, id)
}

function parseNode(object)
{
    if (object.nodeName != "item") {
        handleError("Wrong item type! Should be 'item'.");
        return null;
    }
    if (!object.hasChildNodes())
        return null;
    var node = document.createElement("li");
    node.setAttribute("id", sideMenuItemID);
    sideMenuItemID++;
    for (var i = 0; i < object.childNodes.length; i++) {
        var attr = object.childNodes.item(i);
        if (attr.nodeName == "itemName" && attr.hasChildNodes() && attr.childNodes.length == 1) {
            var child = attr.firstChild;
            if (child.nodeType != 3) {
                handleError("Child of 'itemName' should be TEXT_NODE!");
                continue;
            }
            var link = document.createElement("a");
            link.setAttribute("class", "menu");
            var text = document.createTextNode(child.data);
            link.appendChild(text);
            var data = attr.getAttribute("data");
            if (data)
                link.setAttribute("data-address", data);
            node.appendChild(link);
        } else if (attr.nodeName == "children") {
            for (var j = 0; j < attr.childNodes.length; j++) {
                var item = attr.childNodes.item(j);
                var child = parseNode(item);
                if (child != null)
                    node.appendChild(child);
            }
        } else {
            handleError("Invalid attriibute node!");
        }
    }
    return node;
}

function loadTree(file)
{
    var xml = loadXMLDoc(file);
    sideMenuTree = document.createElement("ROOT");
    sideMenuTree.setAttribute("id", sideMenuItemID);
    sideMenuItemID++;
    var rootChildren = xml.documentElement.childNodes;
    for (var i = 0; i < rootChildren.length; i++) {
        var node = parseNode(rootChildren[i]);
        if (node == null) {
            handleError("Null node returned!");
        } else {
            sideMenuTree.appendChild(node);
        }
    }
}
