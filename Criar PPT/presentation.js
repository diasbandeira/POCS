
var Presentation = function (object) {
    this.content = {};
    this.slides = [];
    this.newImages = [];
    this.relsPath = "ppt/slides/_rels/";
    this.mediaPath = "ppt/media/";
    this.lastSlideId = null;
    this.templateSize = 0;
};

function checkIfIsSlide(name) {

    var isSlidePattern = /(ppt\/slides\/).*(.xml)(?!.*?rels)/i;

    var res = isSlidePattern.exec(name);

    if (res != null)
        return true;

    return false;
}

function escapeHtml(string) {

    return string.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&apos;');
}

Presentation.prototype.processSlides = function (pptItem) {

    var nslide = "newSlide";
    var slidePath = "ppt/slides/";
    var cmonImgName = "common";

    if (pptItem.Data == null || pptItem.Data.length === 0)
        return;

    var lastSlide = this.slides[this.slides.length - 1];

    var comonImages = [];

    for (var x = 0; x < pptItem.ImgData.length; x++) {
        pptItem.ImgData[x].cid = cmonImgName + x;
    }

    this.slides.splice(this.slides.length - 1, 1);

    var lastSlideRels = lastSlide.replace(slidePath, this.relsPath) + ".rels";

    var cloneSlide = {
        slide: this.content[lastSlide],
        rels: this.content[lastSlideRels]
    }

    delete this.content[lastSlide];
    delete this.content[lastSlideRels];
    this.removeSlideFromContent(lastSlide);
    // 

    for (var x = 0; x < pptItem.Data.length; x++) {
        var obj = {
            slideContent: cloneSlide.slide,
            referenceContent: cloneSlide.rels
        }

        var nSlidePath = slidePath + nslide + x + ".xml";
        var nSlideRelsPath = this.relsPath + nslide + x + ".xml.rels";

        for (var prop in pptItem.Data[x]) {
            if (pptItem.Data[x].hasOwnProperty(prop) && prop != "ImgData") {
                obj.slideContent = obj.slideContent.replace(new RegExp(prop, 'g'), escapeHtml(pptItem.Data[x][prop]));
            }
        }

        var i = 0;
        for (var i = 0; i < pptItem.Data[x].ImgData.length; i++) {

            if (pptItem.Data[x].ImgData[i] != null)
                this.replaceImages(obj, pptItem.Data[x].ImgData[i], x + "_" + i);
        }

        //Logo reaproveita as imagens
        for (var z = 0; z < pptItem.ImgData.length; z++) {
            this.replaceImages(obj, pptItem.ImgData[z], pptItem.ImgData[z].cid);
        }

        this.content[nSlideRelsPath] = obj.referenceContent;
        this.content[nSlidePath] = obj.slideContent;
        this.addSlideToContent(nSlidePath);
        this.slides.push(nSlidePath);
    }

    this.configureImageTypesInContent();

    this.content["docProps/app.xml"] = this.content["docProps/app.xml"].replace(/<Slides>\d<\/Slides>/, "<Slides>" + this.slides.length + "</Slides>");
}


function checkIfHasImage(n, slide) {
    var reg = new RegExp("title=\"Image" + n + "\"");
    var obj = reg.exec(slide);
    return obj != null;
}

Presentation.prototype.processPhotobookSlides = function (pptItem) {

    var nslide = "newSlide";
    var slidePath = "ppt/slides/";
    var cmonImgName = "common";
    this.templateSize = this.slides.length;

    if (pptItem.Data == null || pptItem.Data.length === 0)
        return;

    var lastSlide = this.slides[this.slides.length - 1];

    var comonImages = [];

    for (var x = 0; x < pptItem.ImgData.length; x++) {
        pptItem.ImgData[x].cid = cmonImgName + x;
    }

    this.slides.splice(this.slides.length - 1, 1);

    var lastSlideRels = lastSlide.replace(slidePath, this.relsPath) + ".rels";

    var cloneSlide = {
        slide: this.content[lastSlide],
        rels: this.content[lastSlideRels]
    }

    delete this.content[lastSlide];
    delete this.content[lastSlideRels];
    this.removeSlideFromContent(lastSlide);

    var imgCount = 1;

    while (true) {
        
        if (!checkIfHasImage(imgCount, cloneSlide.slide)) {
            if (imgCount > 1)
                imgCount--;
            break;
        }
        imgCount++;
    }
    var x = 0;
    while (x < pptItem.Data.length) {
        var obj = {
            slideContent: cloneSlide.slide,
            referenceContent: cloneSlide.rels
        }

        var nSlidePath = slidePath + nslide + x + ".xml";
        var nSlideRelsPath = this.relsPath + nslide + x + ".xml.rels";
        
            for (var imgx = 1; imgx <= imgCount; imgx++) {

                for (var prop in pptItem.Data[x]) {
                    if (pptItem.Data[x].hasOwnProperty(prop) && prop != "ImgData") {
                        var propName = prop;
                        if (imgCount > 1)
                            propName = prop + imgx;

                        obj.slideContent = obj.slideContent.replace(new RegExp(propName, 'g'), escapeHtml(pptItem.Data[x][prop]));
                    }
                }
                
                var i = 0;
                for (var i = 0; i < pptItem.ImgData.length; i++) {

                    if (pptItem.ImgData[i] != null)
                        this.replaceImages(obj, pptItem.ImgData[i], x + "_" + i, imgCount > 1 ? imgx : null);
                }

                x++;

                if (x >= pptItem.Data.length)
                    break;
           
        }

        //Logo reaproveita as imagens
        for (var z = 0; z < pptItem.ImgData.length; z++) {
            this.replaceImages(obj, pptItem.ImgData[z], pptItem.ImgData[z].cid);
        }

        this.content[nSlideRelsPath] = obj.referenceContent;
        this.content[nSlidePath] = obj.slideContent;
        this.addSlideToContent(nSlidePath);
        this.slides.push(nSlidePath);
    }

    this.configureImageTypesInContent();

    if (this.templateSize === 3 && this.slides[1] === 'ppt/slides/slide2.xml' ) {
        this.removeSlideFromContent(this.slides[1]);
        this.addSlideToContent(this.slides[1]);
    }

    this.content["docProps/app.xml"] = this.content["docProps/app.xml"].replace(/<Slides>\d<\/Slides>/, "<Slides>" + this.slides.length + "</Slides>");
}

Presentation.prototype.configureImageTypesInContent = function () {
    var imageList = [{ext : "png", value: "<Default Extension=\"png\" ContentType=\"image/png\"/>"},
                     { ext: "jpg", value: "<Default Extension=\"jpg\" ContentType=\"image/png\"/>" },
                     { ext: "jpeg", value: "<Default Extension=\"jpeg\" ContentType=\"image/jpeg\"/>" }];

    for (var x = 0; x < imageList.length; x++) {
        if (this.content["[Content_Types].xml"].indexOf("<Default Extension=\""+imageList[x].ext +"\"") == -1) {

            var index = this.content["[Content_Types].xml"].indexOf("<Default ");
            this.content["[Content_Types].xml"] = this.content["[Content_Types].xml"].substring(0, index) + imageList[x].value + this.content["[Content_Types].xml"].substring(index);
        }
    }
}


Presentation.prototype.removeSlideFromContent = function (slideName) {
    var contentPart = "<Override PartName=\"/{0}\" ContentType=\"application/vnd.openxmlformats-officedocument.presentationml.slide+xml\"/>";

    this.content["[Content_Types].xml"] = this.content["[Content_Types].xml"].replace(contentPart.replace("{0}", slideName), "");

    var rel = new RegExp("<Relationship (?:(?!.\/>).)*(?=Target=\"{0}\").*?\/>".replace("{0}", slideName.replace("ppt/", "")));

    var relPath = "ppt/_rels/presentation.xml.rels";
    var presPath = "ppt/presentation.xml";

    var res = rel.exec(this.content[relPath]);

    if (res != null) {

        var id = /(Id=\")(\w+)\"/.exec(res[0]);

        var idPattern = new RegExp("(<p:sldId) (?:(?!.\/>).)*r:id=\"{0}\".*?\/>".replace("{0}", id[2]));

        this.content[presPath] = this.content[presPath].replace(idPattern, "");
    }

    this.content[relPath] = this.content[relPath].replace(rel, "");

}

Presentation.prototype.addSlideToContent = function (slideName) {
    var contentPart = "<Override PartName=\"/{0}\" ContentType=\"application/vnd.openxmlformats-officedocument.presentationml.slide+xml\"/>";
    var relPath = "ppt/_rels/presentation.xml.rels";
    var presPath = "ppt/presentation.xml";
    var slid = "<p:sldId id=\"{0}\" r:id=\"{1}\" />";

    var contentWithName = contentPart.replace("{0}", slideName);

    var xml = this.content["[Content_Types].xml"];

    var index = xml.indexOf("<Override");

    this.content["[Content_Types].xml"] = xml.substring(0, index) + contentWithName + xml.substring(index);

    // Presentation

    var relationship = "<Relationship Id=\"{0}\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide\" Target=\"{1}\"/>";
    var nid = "nid" + this.slides.length;

    var newRelation = relationship.replace("{0}", nid).replace("{1}", slideName.replace("ppt/", ""));
    var index = this.content[relPath].indexOf("<Relationship ");

    this.content[relPath] = this.content[relPath].substring(0, index) + newRelation + this.content[relPath].substring(index);

    index = this.content[presPath].indexOf("</p:sldIdLst>");

    if (this.lastSlideId == null) {
        // Pega o ultimo ID

        var slidReg = /(<p:sldId) (?:(?!.\/>).)*(id=\")(\d+)\".*?\/>/g;

        var resSlid = slidReg.exec(this.content[presPath]);

        if (resSlid == null) {
            this.lastSlideId = 256;
            slid = slid.replace("{0}", this.lastSlideId).replace("{1}", nid);
        } else {          
           this.lastSlideId = parseInt(resSlid[resSlid.length - 1]) + 1;          
           slid = slid.replace("{0}", ++this.lastSlideId).replace("{1}", nid);
        }
    } else {
        slid = slid.replace("{0}", ++this.lastSlideId).replace("{1}", nid);
    }

    this.content[presPath] = this.content[presPath].substring(0, index) + slid + this.content[presPath].substring(index);
}

Presentation.prototype.replaceImages = function (obj, image, cid, n) {

    var imageName = image.Name;

    if (n != null) {
        imageName += n;
    }

    var picPattern = "<p:pic>(?:(?!.<\/p:pic>).)*(?={0}).*?<\/p:pic>".replace("{0}", imageName);
    var regPic = new RegExp(picPattern);
    var result = regPic.exec(obj.slideContent);
    var ids = [];
    var nid = "new" + cid;

    var ext;

    if (image.Type == 'jpg')
        ext = ".jpg";
    else
        ext = ".png";

    var newImage = "newImage" + cid + ext;

    this.content[this.mediaPath + newImage] = image.Data;

    if (result != null) {
        for (var x = 0; x < result.length; x++) {
            var res = /(?:embed=").*?"/.exec(result[x]);
            if (res != null) {
                var oldId = res[0].replace("embed=\"", "").replace("\"", '');
                obj.slideContent = obj.slideContent.replace(result[x], result[x].replace(res[0], res[0].replace(oldId, nid)));
            }
        }

        var imgRelationship = "<Relationship Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/image\" Target=\"../media/{0}\" Id=\"{1}\" />";

        imgRelationship = imgRelationship.replace("{0}", newImage).replace("{1}", nid);

        var index = obj.referenceContent.indexOf("</Relationships>");

        obj.referenceContent = obj.referenceContent.substring(0, index) + imgRelationship + obj.referenceContent.substring(index);

    }
}

Presentation.prototype.load = function (data, done) {

    var content = this.content;
    var slides = this.slides;

    JSZip.loadAsync(data).then(function (zip) {
        async.each(Object.keys(zip.files), function (key, callback) {
            var ext = key.substr(key.lastIndexOf('.'));

            //Checa se é um slide padrão
            if (checkIfIsSlide(key))
                slides.push(key);

            if (ext == '.xml' || ext == '.rels') {

                zip.file(key).async("string").then(function (xml) {

                    content[key] = xml;
                    callback(null);
                })

            }
            else {

                zip.file(key).async("base64").then(function (img) {
                    content[key] = img;
                    callback(null);
                })
            }
        }, done);
    })
};

Presentation.prototype.toJSON = function () {
    return this.content;
};


Presentation.prototype.toBuffer = function () {
    var zip2 = new JSZip();
    var content = this.content;
    for (var key in content) {
        if (content.hasOwnProperty(key)) {
            var ext = key.substr(key.lastIndexOf('.'));
            if (ext == '.xml' || ext == '.rels') {
                //var builder = new xml2js.Builder({renderOpts: {pretty: false}});
                // var xml2 = (builder.buildObject(content[key]));
                zip2.file(key, content[key]);
            }
            else {
                zip2.file(key, content[key], { base64: true });
            }
        }
    }
    //  zip2.file("docProps/app.xml", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><TotalTime>1</TotalTime><Words>72</Words><Application>Microsoft Macintosh PowerPoint</Application><PresentationFormat>On-screen Show (4:3)</PresentationFormat><Paragraphs>12</Paragraphs><Slides>3</Slides><Notes>0</Notes><HiddenSlides>0</HiddenSlides><MMClips>0</MMClips><ScaleCrop>false</ScaleCrop><HeadingPairs><vt:vector size="4" baseType="variant"><vt:variant><vt:lpstr>Theme</vt:lpstr></vt:variant><vt:variant><vt:i4>1</vt:i4></vt:variant><vt:variant><vt:lpstr>Slide Titles</vt:lpstr></vt:variant><vt:variant><vt:i4>3</vt:i4></vt:variant></vt:vector></HeadingPairs><TitlesOfParts><vt:vector size="4" baseType="lpstr"><vt:lpstr>Office Theme</vt:lpstr><vt:lpstr>This is the title</vt:lpstr><vt:lpstr>This is the title</vt:lpstr><vt:lpstr>This is the title</vt:lpstr></vt:vector></TitlesOfParts><Company>Proven, Inc.</Company><LinksUpToDate>false</LinksUpToDate><SharedDoc>false</SharedDoc><HyperlinksChanged>false</HyperlinksChanged><AppVersion>14.0000</AppVersion></Properties>');
    zip2.file("docProps/app.xml", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><TotalTime>0</TotalTime><Words>0</Words><Application>Microsoft Macintosh PowerPoint</Application><PresentationFormat>On-screen Show (4:3)</PresentationFormat><Paragraphs>0</Paragraphs><Slides>2</Slides><Notes>0</Notes><HiddenSlides>0</HiddenSlides><MMClips>0</MMClips><ScaleCrop>false</ScaleCrop><HeadingPairs><vt:vector size="4" baseType="variant"><vt:variant><vt:lpstr>Theme</vt:lpstr></vt:variant><vt:variant><vt:i4>1</vt:i4></vt:variant><vt:variant><vt:lpstr>Slide Titles</vt:lpstr></vt:variant><vt:variant><vt:i4>2</vt:i4></vt:variant></vt:vector></HeadingPairs><TitlesOfParts><vt:vector size="3" baseType="lpstr"><vt:lpstr>Office Theme</vt:lpstr><vt:lpstr>PowerPoint Presentation</vt:lpstr><vt:lpstr>PowerPoint Presentation</vt:lpstr></vt:vector></TitlesOfParts><Company>Proven, Inc.</Company><LinksUpToDate>false</LinksUpToDate><SharedDoc>false</SharedDoc><HyperlinksChanged>false</HyperlinksChanged><AppVersion>14.0000</AppVersion></Properties>')
    return zip2.generateAsync({ type: "blob" });

};

