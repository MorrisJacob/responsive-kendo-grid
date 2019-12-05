var widths = [];
$(window).load(function () {
    width = $('table colgroup col').each(function () {

        widths.push($(this).css('width'));

    });
    ResponsiveGrid();
});

$(document).ajaxStop(function () {

    ResponsiveGrid();

});

$(window).resize(function () {
    ResponsiveGrid();
});

function ResponsiveGrid() {
    if ($(document).width() <= 991) {
        MobileKendoGrid();
    } else {
        DesktopKendoGrid();

    }
}

function MobileKendoGrid() {
    $('.k-grid-header').hide();
    $('.k-grid tr td').each(function (i) {
        $(this).replaceWith($('<div style="margin:10px;">' + this.innerHTML + '</div>'));
    });

    var header;
    $('tr').each(function (i) {
        if (i === 0) {
            header = this;

        } else {
            $(this).children().each(function (t) {
                var child = header.childNodes[t];
                var chih = child.innerText;
                if (chih === "") {
                    chih = "Actions";

                }
                if (this.innerHTML.indexOf(chih) < 0) {
                    this.innerHTML = "<b>" + chih + ":</b> " + this.innerHTML;

                }


            });

        }


    });

    $('table colgroup col').css('width', '0');
    $('table colgroup col:first-child').css('width', '100%');

}

function DesktopKendoGrid() {

    $('.k-grid-header').show();
    $('.k-grid tr td').css('border-color', '#ccc');
    $('.k-grid tr div').each(function (i) {
        $(this).replaceWith($('<td>' + this.innerHTML + '</td>'));

    });

    $('tr').each(function (i) {
        if (i === 0) {
            //header row. do nothing

        } else {
            $(this).children().each(function (t) {
                if (this.innerHTML.indexOf("<b>") >= 0) {
                    $(this).find("b").remove();

                }


            });

        }
    });

    $('table colgroup col').each(function (i) {

        $(this).css('width', widths[i]);

    });
}