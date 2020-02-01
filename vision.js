
async function quickstart() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename: './APIKey.json'
    });
  
    // Performs label detection on the image file
    const [result] = await client.labelDetection('./plasticbag.jpg');
    const labels = result.labelAnnotations;
    console.log('Labels:');
    let ar = new Array();
    ar = labels;
    
    for(let i =0;i < ar.length; i++){
        let st = ar[i].description;
        
        if(st.includes("Plastic") || st.includes("plastic")){
            console.log("recycle");
            break;
        }

    }
    // labels.forEach(function(label)

    // {
    //     let st = label.description;
        
    //     if(st.includes("Plastic") || st.includes("plastic")){
    //         console.log("recycle");
            
    //     }
    // });
}

  quickstart();