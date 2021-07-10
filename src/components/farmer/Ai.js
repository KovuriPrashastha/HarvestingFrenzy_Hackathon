import React from 'react'
import FarmerNav from "./FarmerNav"

function Ai( {setFarmer, farmer}) {
    let url = "https://storage.googleapis.com/tfhub-visualizers/visualizers/vision/index.html?modelMetadataUrl=https%3A%2F%2Fstorage.googleapis.com%2Ftfhub-visualizers%2Fagripredict%2Fdisease-classification%2F1%2Fmetadata.json&publisherName=AgriPredict&publisherThumbnailUrl=https%3A%2F%2Fagripredict-tfub.s3.amazonaws.com%2Fimages%2Fagripredict-v2.png"
    return (
        <div>
            <FarmerNav setFarmer={setFarmer} farmer={farmer} />
            <div>

            <iframe style={{width : "100%", height: 700 , border: "none"}} src={url}></iframe>
            </div>
        </div>
    )
}

export default Ai
