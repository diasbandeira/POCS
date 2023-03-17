function base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}

var pptx = new Presentation();
var file = base64ToArrayBuffer(base64);

pptx.load(file, function (err) {
    pptx.processPhotobookSlides(itens);    
    pptx.toBuffer().then(function (content) {
        var blob = new Blob([content]);
        var link = document.createElement('a');
        link.setAttribute("type", "hidden")
        document.body.appendChild(link);
        link.href = window.URL.createObjectURL(blob);
        link.download = "PhotoBook.pptx"
        link.click();
        document.body.removeChild(link);
        callback();
    })
});