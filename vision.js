var express = require('express');
var app = express();
const vision = require('@google-cloud/vision');


var bodyparser = require('body-parser');
app.use(bodyparser.json({limit: '5mb'}));

async function quickstart(arr) {
    // Imports the Google Cloud client library
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename: './APIKey.json'
    });

    // Performs label detection on the image file
    const [result] = await client.labelDetection({image:{content:arr}});
    const [lresult] = await client.logoDetection({image:{content:arr}});
    const labels = result.labelAnnotations;
    console.log(labels);
    const logos = lresult.logoAnnotations;
    
    let ar = new Array();
    ar = labels;

    let logoarr = new Array();
    logoarr = logos;
   
    let r = "recycle";
    let c = "compost";  
    let l = "landfill"
   
    let maps = new Map([["metal", r], ["plastic", r], ["glass",r], ["aluminum", r], ["tin", r], ["food", c], ["paper", c], ["cardboard", r], ["fruit", c], ["coffee filter", c], ["vegetable", c], ["plant", c], ["tea bag", c], ["drinkware", r], ["cloth", r], ["linen", r]]);

    if(logoarr.length > 0){
        return r;
    }
    
   for(let i=0; i < ar.length; i++){
       let st = ar[i].description;
       console.log(st);
       

        for(let [k, v] of maps)
        {
            if(st.toLowerCase().includes(k)){
                return v;
            }
        }
    }
    return l;

}

//   let output = quickstart('./tshirt.jpg');
//   output.then(function(result){
//       console.log(result);
//   })

app.get('/',(req,res) => {
    res.sendFile('./garbageSortImageUpload.html', {root: __dirname});
})

app.post("/image", async function(req, res) {
    var image = req.body.image;
    //console.log(image)
    image = image.substring(23)
    var results = await quickstart(image);
    console.log(results);
    res.json(results)
})
app.listen(3000);
console.log("im listening");
