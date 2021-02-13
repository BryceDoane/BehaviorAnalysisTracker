var base64Img = null;
function genPDF() {
  //alert("test");
  var doc = new jsPDF();
  doc.text(20, 20, 'test');
  doc.addPage();
  doc.text(29, 20, 'test2');
  margins = {
    top: 70,
    bottom: 40,
    left: 30,
    width: 550
  };
  var chart = new google.visualization.ComboChart(document.getElementById('chartContainer4')); /* Define your ComboChart object */
  google.visualization.events.addListener(chart, 'ready', function () {
    var content = '<img src="' + chart.getImageURI() + '">';
    $('#PDFCharts').append(content);
  }); /* Adds a listener to make a image of chart inside a #graph-images*/
 /* draw the chart using above define 'data' and 'options' */
  doc.fromHTML(document.getElementById('chartContainer4'),
    margins.left, // x coord
    margins.top,
    {
      // y coord
      width: margins.width// max width of content on PDF
    }, function (dispose) {
      headerFooterFormatting(doc)
    },
    margins);
  doc.save('test.pdf');
}

function headerFooterFormatting(doc) {
  var totalPages = doc.internal.getNumberOfPages();

  for (var i = totalPages; i >= 1; i--) { //make this page, the current page we are currently working on.
    doc.setPage(i);

  }
};

function header(doc) {
  doc.setFontSize(30);
  doc.setTextColor(40);
  doc.setFontStyle('normal');

  if (base64Img) {
    doc.addImage(base64Img, 'JPEG', margins.left, 10, 40, 40);
  }

  doc.text("Report Header Template", margins.left + 50, 40);

  doc.line(3, 70, margins.width + 43, 70); // horizontal line
};

