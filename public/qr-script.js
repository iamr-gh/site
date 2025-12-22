let prevQrCode = null;

function makeQRCode(str) {
  const errorMessage = document.getElementById("error-message");
  
  if (str.length > 17) {
    errorMessage.classList.remove("hidden");
    return;
  }
  
  errorMessage.classList.add("hidden");
  
  var arr = [];
  for (var i = 0; i < str.length; i++) {
    arr.push(str.charCodeAt(i));
  }
  var qrCode = make_qr_code__encoder_u704(arr);

  // Convert qrCode into boolean array
  var boolQrCode = [];
  for (var i = 0; i < qrCode.length; i++) {
    boolQrCode[i] = [];
    for (var j = 0; j < qrCode[i].length; j++) {
      boolQrCode[i][j] = Boolean(qrCode[i][j]);
    }
  }

  // output of the qr code is a 21 x 21 2d array of booleans
  // console.log(boolQrCode); // Removed for performance

  // create a svg element
  var svg = document.getElementById("qr-code-svg");
  if (!svg) {
    console.error("SVG element not found!");
    return;
  }
  svg.innerHTML = "";

  // Calculate square size to fill the entire SVG
  const svgWidth = 280; // Match SVG width
  const squareSize = svgWidth / boolQrCode.length; // Dynamic scaling
  const svgHeight = boolQrCode.length * squareSize;

  // Update SVG height to match calculated height
  svg.setAttribute("height", svgHeight);

  // write array values as black and white squares
  for (var i = 0; i < boolQrCode.length; i++) {
    for (var j = 0; j < boolQrCode[i].length; j++) {
      var square = document.createElementNS(svg.namespaceURI, "rect");
      square.setAttribute("width", squareSize);
      square.setAttribute("height", squareSize);
      square.setAttribute("fill", boolQrCode[i][j] ? "black" : "white");
      square.setAttribute("x", j * squareSize);
      square.setAttribute("y", i * squareSize);
      svg.appendChild(square);
    }
  }
  
  // console.log("QR code generated with", boolQrCode.length, "rows and", boolQrCode[0].length, "columns"); // Removed for performance
  
  prevQrCode = boolQrCode;
}

function downloadSVG() {
  const svg = document.getElementById("qr-code-svg");
  const input = document.getElementById("qr-input");
  const filename = input.value.replace(/\./g, '-') || 'qr-code';
  svg.style.backgroundColor = "white"; // Temporarily set background to white
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(svg);
  svg.style.backgroundColor = ""; // Reset background
  const blob = new Blob([svgStr], {type: 'image/svg+xml'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadPNG() {
  const svg = document.getElementById("qr-code-svg");
  const input = document.getElementById("qr-input");
  const filename = input.value.replace(/\./g, '-') || 'qr-code';
  svg.style.backgroundColor = "white"; // Temporarily set background to white
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const data = (new XMLSerializer()).serializeToString(svg);
  const DOMURL = window.URL || window.webkitURL || window;
  
  const img = new Image();
  const svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
  const url = DOMURL.createObjectURL(svgBlob);
  
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    DOMURL.revokeObjectURL(url);
    svg.style.backgroundColor = ""; // Reset background
    
    const imgURI = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    
    const a = document.createElement('a');
    a.href = imgURI;
    a.download = `${filename}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  img.src = url;
}

// Initialize with a default QR code
document.addEventListener('DOMContentLoaded', function() {
  makeQRCode('Hello World');
});