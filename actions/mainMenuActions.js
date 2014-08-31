function buttonFocused()
{
    this.style.background="#000013";
};

function buttonUnfocused()
{
    this.style.background="#031121";
};

function pageLoaded()
{
    var menuTab = document.getElementsByTagName("a");
    for (i = 0; i < menuTab.length; i++) {
        var menu = menuTab[i];
        menu.onmouseover=buttonFocused;
        menu.onmouseout=buttonUnfocused;
    }
};
