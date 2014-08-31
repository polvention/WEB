function dispatchEvent(e)
{
    if (!e)
        var e = window.event;
    if (e.target) {
        return e.target;
    } else if (e.srcElement) {
        return e.srcElement;
    } else {
        handleError("There's no target element!");
        return null;
    }
};

function handleItemChosen(e)
{
    console.log("asdfasdf");
    var targ = dispatchEvent(e);
    if (targ == null)
        return;
    if (targ.nodeName != 'A') {
        handleError("Event from invalid object!");
        return;
    }
    var value = targ.getAttribute("data-address");
    if (value) {
        var mainBody = document.getElementById("bodyObject");
        if (!mainBody) {
            handleError("There's no 'mainBody' object!");
            return;
        }
        mainBody.setAttribute("data", value);
    }
};


function addListener(node)
{
    if (node.addEventListener) {
        node.addEventListener("itemChosen", handleItemChosen, false);
    } else if (node.attachEvent) {
        node.attachEvent('itemChosen', handleItemChosen);
    }
}

function pageLoaded(id)
{
    var debug = parseDebugFlag();
    if (debug)
        console.log("pageLoaded");
    var menu = document.getElementById("sideObject");
    addListener(menu);
    menu = document.getElementById("mainObject");
    addListener(menu);

    var objectsTab = document.getElementsByTagName("object");
    for (i = 0; i < objectsTab.length; i++)
        objectsTab[i].style.visibility="visible";
};
