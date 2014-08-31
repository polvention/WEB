function buttonFocused()
{
    this.style.background="#000013";
    this.style.cursor="pointer";
};

function buttonUnfocused()
{
    this.style.background="#031121";
    this.style.cursor="default";
};

function clearSideMenu()
{
    var sideMenu = document.getElementsByClassName("divSideMenu")[0];
    if (sideMenu == null)
        return;
    for (var i = sideMenu.childNodes.length - 1; i >= 0; i--) {
        var node = sideMenu.childNodes.item(i);
        if (node.nodeType == 1)
            sideMenu.removeChild(node);
    }

}

function attachSideMenuLevel(node)
{
    var sideMenu = document.getElementsByClassName("divSideMenu")[0];
    for (var i = 0; i < node.childNodes.length; i++) {
        var object = node.childNodes.item(i);
        if (object.nodeType == 1 && object.nodeName == "LI") {
            var copy = getPureNode(object);
            sideMenu.appendChild(copy);
        }
    }
}

function buttonClicked(e)
{
    var data = this.parentNode.getAttribute("id");
    var node = null;
    if (data == "BACK") {
        var parentId = this.parentNode.getAttribute("data-parent");
        var parentNode = getNodeById(sideMenuTree, parentId);
        node = parentNode.parentNode;
        data = node.getAttribute("id");
    } else {
        node = getNodeById(sideMenuTree, data);
            e.preventDefault();
        var eve = new CustomEvent("itemChosen", {
            detail: {
                message: "dupa",
                time: new Date(),
            },
            bubbles: true,
            cancelable: true
        });
        eve.initEvent();
        document.dispatchEvent(eve);
        if (node == null || !hasChildNodes(node))
            return;
    }

    clearSideMenu();

    attachSideMenuLevel(node);

    if (Boolean(data != 0)) {
        var back = getBackButton(null, data);
        var sideMenu = document.getElementsByClassName("divSideMenu")[0];
        sideMenu.appendChild(back);
    }
    setEventHandlers();
}

function setEventHandlers()
{
    var menuTab = document.getElementsByTagName("a");
    for (var i = 0; i < menuTab.length; i++) {
        var menu = menuTab[i];
        menu.onmouseover = buttonFocused;
        menu.onmouseout = buttonUnfocused;
        menu.onclick = buttonClicked;
    }
}

function pageLoaded()
{
    loadTree("data/sideMenuTree.xml");
    var node = getNodeById(sideMenuTree, 0);
    if (node == null || !node.hasChildNodes()) {
        handleError("SideMenu node tree is empty!");
        return;
    }
    
    attachSideMenuLevel(node);
    setEventHandlers();
};
