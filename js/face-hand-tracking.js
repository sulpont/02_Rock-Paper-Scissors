
const video = document.getElementById("my-video");
const canvas = document.getElementById("my-canvas");

let model;

const options = {
    flipHorizontal: true,
    maxNumBoxes: 3,
    scoreThreshold: 0.8,
}

let context = canvas.getContext("2d");

handTrack.load(options).then(function (modelData) {
    model = modelData;
    console.log(model);

    handTrack.startVideo(video).then(function (status) {
        if (status) {
            console.log(status);
            startDetection();
        } else {
            console.log("failed")
        }
    })
});

context.font = "18pt Arial";
context.fillText("Now Loading...", 75, 100);

function startDetection() {
    model.detect(video).then((predictions) => {
        model.renderPredictions(predictions, canvas, context, video);
        requestAnimationFrame(startDetection);

        // console.log(predictions);

        // console.log(predictions.slice(2, 2));
        // if (predictions === 'face') {
        //     console.log(predictions);
        // }
    });
};

//close point openのみログ出力
// x: Array(4), class: 5, label: 'face', score: '0.98'} 配列の2