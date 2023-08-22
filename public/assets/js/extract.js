const colorNames = {
    beige: chroma('rgb(244, 243, 215)').lab(),
    brown: chroma('rb(129, 72, 32)').lab(),
    blue: chroma('rgb(0, 88, 163)').lab(),
    grey: chroma('rgb(148, 148, 148)').lab(),
    pink: chroma('rgb(255, 184, 195)').lab(),
    lightblue: chroma('rgb(119, 221, 208)').lab(),
    yellow: chroma('rgb(255, 219, 0)').lab(),
    green: chroma('rgb(59, 125, 34)').lab(),
    purple: chroma('rgb(169,110,204)').lab(),
    orange: chroma('rgb(255,154,2)').lab(),
    red: chroma('rgb(240,15,0)').lab(),
    white: chroma('rgb(255,255,255)').lab(),
    black: chroma('rgb(0,0,0)').lab()
};

const deltaEThreshold = 30;    // 임계 설정값

function deltaE(lab1, lab2) {
    const [L1, a1, b1] = lab1;
    const [L2, a2, b2] = lab2;

    const dL = L1 - L2;
    const da = a1 - a2;
    const db = b1 - b2;

    return Math.sqrt(dL * dL + da * da + db * db);
}

function classifyColor(color, threshold) {
    let minDeltaE = Infinity;
    let closestColorName = null;

    Object.entries(colorNames).forEach(([name, labColor]) => {
        const currentDeltaE = deltaE(chroma(color).lab(), labColor);
        if (currentDeltaE < minDeltaE && currentDeltaE < threshold) {
            minDeltaE = currentDeltaE;
            closestColorName = name;
        }
    });

    return closestColorName;
}

$('#input-image').on('change', function (event) {
    const file = event.target.files[0];
    const imgElement = new Image();

    imgElement.src = URL.createObjectURL(file);
    $(imgElement).on('load', function () {

        const imgPreview = $('<img>');
        imgPreview.attr('src', imgElement.src);
        imgPreview.attr('width', 200);

        $('.img-preview-container').empty();
        $('.img-preview-container').append(imgPreview);
        $('.img-preview-container').css('border','none');


        const colorThief = new ColorThief();
        const numberOfColors = 5;
        const palette = colorThief.getPalette(imgElement, numberOfColors);

        $('#color-array').text(JSON.stringify(palette));
        
        const colorArray = [];
        $(palette).each((_, color) => {
            if (colorArray.length >= 3) {
                
                return false;
            }

            const closestColorName = classifyColor(color, deltaEThreshold);
            if (closestColorName && !colorArray.includes(closestColorName)) {
                colorArray.push(closestColorName);
            }
        });

        $('#color-pallete').val(JSON.stringify(colorArray, null, 2));
        console.log(colorArray) // 추출 색상값
        console.log(imgElement) // 추출 이미지값(preview)
    });
});
