var canvas = document.getElementById("canvas");
var mouseCheck = 0; //constant to check if the mouse is kept pressed
var leftMenu = document.getElementById("color-buttons");

//creating color buttons
function createColorButton(idArray, colorArray) {
    for (let i = 0; i < idArray.length; i++) {
        var button = document.createElement("div");
        leftMenu.appendChild(button);
        var id = idArray[i];
        button.style.backgroundColor = (colorArray[i]);
        button.setAttribute("id", id);
        button.setAttribute("class", "color-button");
        button.addEventListener("click", changeColor);
    }
}
var colorButtonArray = ["red", "orange", "yellow", "lightgreen", "green", "lightblue", "blue", "purple", "pink"];
var colorButtonBackgroundArray = ["rgb(255, 0, 0)", "rgb(255, 136, 0)", "rgb(251, 255, 0)", "rgb(157, 255, 0)", "rgba(0, 255, 55, 0.822)", "rgb(0, 255, 234)", "rgb(0, 68, 255)", "rgb(111, 0, 255)", "rgb(255, 0, 242)"]
createColorButton(colorButtonArray, colorButtonBackgroundArray);

//choosing color
var colorPickerConstant = 0;
function changeColor(input) {
    if (input == "white") {
        color = "white";
        colorPickerConstant = 0;
    }
    else {
        color = input.target.style.backgroundColor;
        colorPickerConstant = 0;
    }
}
//choosing color from color picker
var colorPicker = document.getElementById("color-picker-constant");
var colorPickerConstant = 0;
colorPicker.addEventListener("click", changeColorPickerConstant);
function changeColorPickerConstant() {
    colorPickerConstant = 1;
}

//brush size
var divHeight = 10;
var divWidth = 10;
function heightandwidth(value) {
    divHeight = value;
    divWidth = value;
}

//brush shape
var radiusNumber = 0;
function brushRadiusNumber(number) {
    radiusNumber = number;
}

//rotate canvas button
var rotateCanvas = document.getElementById("rotate-canvas");
rotateCanvas.addEventListener("click", rotateTheCanvas);
var rotationConstant = 0;
var checkRotationConstant = 0;
function rotateTheCanvas() {
    if (rotationConstant == 0) {
        canvas.style.transform = "rotate(90deg)";
        rotationConstant = 1;
        checkRotationConstant = 1;
    }
    else if (rotationConstant == 1) {
        canvas.style.transform = "rotate(180deg)";
        rotationConstant = 2;
        checkRotationConstant = 1;
    }
    else if (rotationConstant == 2) {
        canvas.style.transform = "rotate(270deg)";
        rotationConstant = 3;
        checkRotationConstant = 1;
    }
    else if (rotationConstant == 3) {
        canvas.style.transform = "rotate(360deg)";
        rotationConstant = 0;
        checkRotationConstant = 1;
    }
}

//clear canvas button
var clearCanvas = document.getElementById("clear-canvas");
clearCanvas.addEventListener("click", cleanTheCanvas);
function cleanTheCanvas() {
    canvas.innerHTML = "";
}

//painting on canvas
canvas.addEventListener("mousemove", clickLocation);
addEventListener("mouseup", () => mouseCheck = 0);
addEventListener("mousedown", () => mouseCheck = 1);

//save button
var saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", savingImage);
function savingImage() {
    var saveName = prompt("Please write a name for your artwork:");
    var artwork = canvas.innerHTML;
    localStorage.setItem(saveName, artwork);
}

//load button
var loadButton = document.getElementById("load-button");
loadButton.addEventListener("click", loadingImage);
function loadingImage() {
    var loadName = prompt("Please write the name of the saved file:");
    canvas.innerHTML = localStorage.getItem(loadName);
}

function clickLocation(click) {
    if (mouseCheck == 1) {
        if (checkRotationConstant == 0 || rotationConstant == 0) {
            var paintPixel = document.createElement("div");
            paintPixel.style.position = ("absolute");
            paintPixel.style.height = (divHeight + "px");
            paintPixel.style.width = (divWidth + "px");
            paintPixel.style.borderRadius = (radiusNumber + "%")
            if (colorPickerConstant == 1) {
                paintPixel.style.backgroundColor = (document.getElementById("color-picker").value);
            }
            else if (colorPickerConstant == 0) {
                paintPixel.style.backgroundColor = color;
            }
            paintPixel.style.left = (click.clientX - canvas.offsetLeft + "px");
            paintPixel.style.top = (click.clientY - canvas.offsetTop + "px");
            canvas.appendChild(paintPixel);
        }
        else {
            alert("The rotation will be reseted to continue drawing");
            mouseCheck = 0;
            rotationConstant = 3;
            rotateTheCanvas();
        }
    }
}