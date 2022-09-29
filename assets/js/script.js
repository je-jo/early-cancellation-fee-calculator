/*
CHANGE DATE AND CURRENCY FORMAT
*/

function formatPrice(num) {
    return num.toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function formatDate(date) {
    return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

/*
CHANGE RATE PLANS, BONUSES AND HARDWARE:
*/

//setup: construct arrays of package objects, don't touch this:

function constructPlan(name, price, qty, calcPrice) {
    const obj = {};
    obj.name = name;
    obj.price = price;
    obj.qty = qty;
    obj.calcPrice = calcPrice;
    return obj;
}

/* EDIT RATE PLANS HERE */

const ratePlans = [
    constructPlan("basic", 1395, 0, 0),
    constructPlan("double-bundle-basic", 1495, 0, 0),
    constructPlan("double-bundle-extra", 1595, 0, 0),
    constructPlan("double-bundle-elite", 1695, 0, 0),
    constructPlan("double-bundle-vip", 1795, 0, 0),
    constructPlan("triple-bundle-basic", 2795, 0, 0),
    constructPlan("triple-bundle-extra", 2895, 0, 0),
    constructPlan("triple-bundle-elite", 2995, 0, 0),
    constructPlan("triple-bundle-vip", 3095, 0, 0),
    constructPlan("quatro-bundle-basic", 3795, 0, 0),
    constructPlan("quatro-bundle-extra", 3895, 0, 0),
    constructPlan("quatro-bundle-elite", 3995, 0, 0),
    constructPlan("quatro-bundle-vip", 4095, 0, 0),
];

/* EDIT PRODUCT PACKAGES HERE (i.e. channels bundles, others extras and benefits) */

const productPackages = [
    constructPlan("abc", 310, 0, 0),
    constructPlan("def", 410, 0, 0),
    constructPlan("zulu", 510, 0, 0),
    constructPlan("newstime", 550, 0, 0),
    constructPlan("movietime", 610, 0, 0),
    constructPlan("daytime", 710, 0, 0),
    constructPlan("nighttime", 999, 0, 0),
    constructPlan("net-speed-boost", 2999, 0, 0),
];

/* EDIT HARDWARE ITEMS HERE. FOR ITEMS THAT ARE PAID FOR MONTHLY INSTEAD OF ONE-TIME-ONLY, YOU **MUST** INCLUDE THE WORD "RENT" */

const hardwareItems = [
    constructPlan("cable-instalation", 3900, 0, 0),
    constructPlan("tv-smart-box", 6900, 0, 0),
    constructPlan("tv-smart-box-50%", 3450, 0, 0),
    constructPlan("rent-tv-smart-box", 290, 0, 0),
    constructPlan("basic-modem", 3900, 0, 0),
    constructPlan("medium-modem", 4900, 0, 0),
    constructPlan("advanced-modem", 6900, 0, 0),
    constructPlan("extra-stb", 3500, 0, 0),
    constructPlan("repair-stb", 1500, 0, 0),
];

//setup: dinamically add select menus and checkboxes

const currentRatePlanInput = document.querySelector("#rp-current"); //add rate plans select menus, constructed from rate plans array
const previousRatePlanInput = document.querySelector("#rp-prev");

for (let i = 0; i < ratePlans.length; i++) {
    const newOptionItem = document.createElement("option");
    newOptionItem.setAttribute("value", `${ratePlans[i].name}`);
    newOptionItem.textContent = `${ratePlans[i].name
        .replaceAll("-", " ")
        .toUpperCase()}`;
    let newOptionCopy = newOptionItem.cloneNode(true);
    currentRatePlanInput.appendChild(newOptionItem);
    previousRatePlanInput.appendChild(newOptionCopy);
}

const channelsContainer = document.querySelector("#channels"); //add product packages to page, constructed from product packages array

for (let i = 0; i < productPackages.length; i++) {
    const newListItem = document.createElement("li");
    newListItem.classList.add("wrapper--checkbox");
    const newCheckbox = document.createElement("input");
    newCheckbox.setAttribute("type", "checkbox");
    newCheckbox.setAttribute("id", `${productPackages[i].name}`);
    newCheckbox.setAttribute("name", "calc-by-time");
    const newLabel = document.createElement("label");
    newLabel.setAttribute("for", `${productPackages[i].name}`);
    newLabel.textContent = `${productPackages[i].name.replaceAll("-", " ")}`;
    const newSpanPrice = document.createElement("span");
    newSpanPrice.textContent = productPackages[i].price;
    const newTextInput = document.createElement("input");
    newTextInput.setAttribute("type", "text");
    newTextInput.classList.add("modifier");
    const newSpan = document.createElement("span");
    newSpan.classList.add("channels-calc-price");
    newSpan.textContent = productPackages[i].calcPrice;
    newListItem.appendChild(newCheckbox);
    newListItem.appendChild(newLabel);
    newListItem.appendChild(newSpanPrice);
    newListItem.appendChild(newTextInput);
    newListItem.appendChild(newSpan);
    channelsContainer.appendChild(newListItem);
}

const hardwareContainer = document.querySelector("#hardware"); //add hardware to page, constructed from hardware array

for (let i = 0; i < hardwareItems.length; i++) {
    const newListItem = document.createElement("li");
    newListItem.classList.add("wrapper--checkbox");
    const newCheckbox = document.createElement("input");
    newCheckbox.setAttribute("type", "checkbox");
    newCheckbox.setAttribute("id", `${hardwareItems[i].name}`);
    if (`${hardwareItems[i].name}`.includes("rent")) {
        //some items are rented and we need to calculate them by contract time, instead of once, MUST INCLUDE WORD "RENT" IN NAME
        newCheckbox.setAttribute("name", "calc-by-time");
    } else {
        newCheckbox.setAttribute("name", "calc-by-piece");
    }
    const newLabel = document.createElement("label");
    newLabel.setAttribute("for", `${hardwareItems[i].name}`);
    newLabel.textContent = `${hardwareItems[i].name.replaceAll("-", " ")}`;
    const newSpanPrice = document.createElement("span");
    newSpanPrice.textContent = hardwareItems[i].price;
    const newTextInput = document.createElement("input");
    newTextInput.setAttribute("type", "text");
    if (`${hardwareItems[i].name}`.includes("rent")) {
        newTextInput.classList.add("multiple-rent");
    } else {
        newTextInput.classList.add("modifier");
    }
    const newSpan = document.createElement("span");
    newSpan.classList.add("hardware-calc-price");
    newSpan.textContent = hardwareItems[i].calcPrice;
    newListItem.appendChild(newCheckbox);
    newListItem.appendChild(newLabel);
    newListItem.appendChild(newSpanPrice);
    newListItem.appendChild(newTextInput);
    newListItem.appendChild(newSpan);
    hardwareContainer.appendChild(newListItem);
}

//01. set today

let currentDay = new Date().getDate();
if (currentDay === 31) {
    currentDay = 30;
}
const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();
const todayFormatted = formatDate(new Date());

const displayToday = document.querySelector("#date-today");
displayToday.textContent = todayFormatted;

// 02. set contract start date

const dateInputStart = document.querySelector("#date-start-contract");

function setStartYear(dateentry) {  //runs on date button click and 12/24 check box, 
    return +dateentry.value.split("-")[0];
}
function setStartMonth(dateentry) {
    return +dateentry.value.split("-")[1];
}
function setStartDay(dateentry) {
    if (+dateentry.value.split("-")[2] == 31) {
        return 30;
    } else {
        return +dateentry.value.split("-")[2];
    }
}

//03. calculate days left and passed

let contractLength = 719; //assumes contract lasts 23m and 29 days, with 1m = 30 days

function calculateDays(fromDay, toDay, fromMonth, toMonth, fromYear, toYear) {
    switch (toYear - fromYear) {
        case 0:
            return toDay - fromDay + (toMonth - fromMonth) * 30;
        case 1:
            return (
                30 -
                fromDay +
                (12 - fromMonth) * 30 +
                toDay +
                (toMonth - 1) * 30
            );
        case 2:
            return (
                30 -
                fromDay +
                (12 - fromMonth) * 30 +
                toDay +
                (toMonth - 1) * 30 +
                360
            );
    }
}

let totalDaysPassed = () => calculateDays(setStartDay(dateInputStart), currentDay, setStartMonth(dateInputStart), currentMonth, setStartYear(dateInputStart), currentYear);

let totalDaysLeft = () => contractLength - totalDaysPassed();

// 04. format and display days

let formattedDaysPassed = () =>
    `${Math.floor(totalDaysPassed() / 30)} m and ${totalDaysPassed() % 30} d`;
let formattedDaysLeft = () =>
    `${Math.floor(totalDaysLeft() / 30)} m and ${totalDaysLeft() % 30} d`;

const displayDateStart = document.querySelector("#date-start");
const displayTimePassed = document.querySelector("#time-passed");
const displayTimeLeft = document.querySelector("#time-left");

const displayRatePlanPrice = document.querySelector("#rp-price");
const displayTotalPaymentsLeft = document.querySelector("#total-left");


function updateDisplay() {     //runs on date button click, 12/24 check box and select current rate plan
    let startDateValue = new Date(dateInputStart.value);
    if (!dateInputStart.value) {
        alert("Please enter correct start date.");
        return;
    }
    displayDateStart.textContent = formatDate(startDateValue);
    displayTimePassed.textContent = formattedDaysPassed();
    displayTimeLeft.textContent = formattedDaysLeft();
    if (selectedRatePlan) {
        displayRatePlanPrice.textContent = formatPrice(currentPrice());
        displayTotalPaymentsLeft.textContent = formatPrice(totalPaymentsLeft());
    } else {
        displayTotalPaymentsLeft.textContent = "Please choose rate plan.";
    }
}

// 05. date button and 12/24 checkbox

const buttonDate = document.querySelector(".btn--date");
buttonDate.addEventListener("click", () => {
    setStartYear(dateInputStart);
    setStartMonth(dateInputStart);
    setStartDay(dateInputStart);
    if (!totalDaysPassed() || totalDaysPassed() <= 0) {
        alert("Please enter correct start date.");
        return;
    }
    if (totalDaysPassed() >= 719) {
        alert("The contract has already ended");
        return;
    }
    updateDisplay();
});

const lengthInput = document.querySelector("#length"); // 12/24 checkbox
lengthInput.addEventListener("change", function (e) {
    if (e.currentTarget.checked) {
        contractLength = 359;
    } else {
        contractLength = 719;
    }
    setStartYear(dateInputStart);
    setStartMonth(dateInputStart);
    setStartDay(dateInputStart);
    if (totalDaysLeft() <= 0) {
        alert("12 months has ended.");
        contractLength = 719;
        e.currentTarget.checked = false;
        updateDisplay();
        return;
    }
    updateDisplay();
});

//06. set current rate plan and total payments left

let selectedRatePlan;

currentRatePlanInput.addEventListener("click", (e) => {
    selectedRatePlan = e.currentTarget.value;
    totalPaymentsLeft();
    updateDisplay();
});

let currentPrice = () => {
    return ratePlans.find((plan) => plan.name.includes(selectedRatePlan)).price; //important!
};

let totalPaymentsLeft = () => {
    return (currentPrice() / 30) * totalDaysLeft();
};

//07. calculate reduced price

const reductionType = document.querySelector("#reduction-type");
const percentContainer = document.querySelector("#reduction-percent");
const ammountContainer = document.querySelector("#reduction-ammount");

reductionType.addEventListener("change", () => {
    if (reductionType.value === "one" || reductionType.value === "none") {
        previousRatePlanInput.style.display = "none";
        percentContainer.style.display = "none";
        ammountContainer.style.display = "none";
        reducedPrice();
        reductionTotal();
        updateDisplayBenefits();
    } else if (reductionType.value === "prev") {
        previousRatePlanInput.style.display = "block";
        percentContainer.style.display = "none";
        ammountContainer.style.display = "none";
    } else if (reductionType.value === "percent") {
        percentContainer.style.display = "block";
        previousRatePlanInput.style.display = "none";
        ammountContainer.style.display = "none";
    } else if (reductionType.value === "ammount") {
        ammountContainer.style.display = "block";
        percentContainer.style.display = "none";
        previousRatePlanInput.style.display = "none";
    }
});

let previousRatePlan;
previousRatePlanInput.addEventListener("click", (e) => {
    previousRatePlan = e.currentTarget.value;
    previousPrice();
    reducedPrice();
    reductionTotal();
    updateDisplayBenefits();
});

let previousPrice = () => {
    if ((ratePlans.find((plan) => plan.name.includes(previousRatePlan)).price) > currentPrice()) {
        return currentPrice(); //so the difference is zero if previous rate plan is more expensive than current.
    } else {
        return ratePlans.find((plan) => plan.name.includes(previousRatePlan)).price;
    }
};

const percentInput = [
    ...document.querySelectorAll("input[name='reduction-percent']"),
];
const ammountInput = [
    ...document.querySelectorAll("input[name='reduction-ammount']"),
];
let percentReduction;
let ammountReduction;
percentInput.forEach((input) => {
    input.addEventListener("change", (e) => {
        percentReduction = e.currentTarget.value;
        reducedPrice();
        reductionTotal();
        updateDisplayBenefits();
    });
});
ammountInput.forEach((input) => {
    input.addEventListener("change", (e) => {
        ammountReduction = e.currentTarget.value;
        reducedPrice();
        reductionTotal();
        updateDisplayBenefits();
    });
});

let multiplier;
const inputMultiplier = document.querySelector("input[class='multiplier']");
inputMultiplier.addEventListener("change", (e) => {
    multiplier = +e.currentTarget.value;
    if (multiplier > totalDaysPassed() / 30) { //check if benefit period is larger than total time passed
        alert("Wrong entry! The benefit is still active.");
        e.currentTarget.value = ""; //clear wrong value
        multiplier = null;
    }
    reducedPrice();
    reductionTotal();
    updateDisplayBenefits();
});

let reducedPrice = () => {
    if (reductionType.value === "one") {
        return currentPrice() - 1;
    }
    if (reductionType.value === "prev") {
        return currentPrice() - previousPrice();
    }
    if (reductionType.value === "percent") {
        return currentPrice() * percentReduction;
    }
    if (reductionType.value === "ammount") {
        return currentPrice() - ammountReduction;
    } else return 0;
};

let reductionTotal = () => {
    if (multiplier) {
        return reducedPrice() * multiplier;
    } else {
        return reducedPrice() * (totalDaysPassed() / 30);
    }
};

const displayReducedPrice = document.querySelector("#reduction");
const displayReductionTotal = document.querySelector("#total-reduction");

function updateDisplayBenefits() {
    displayReducedPrice.textContent = formatPrice(reducedPrice());
    displayReductionTotal.textContent = formatPrice(reductionTotal());
    displayTotalChannels.textContent = formatPrice(totalPackages());
    displayTotalHardware.textContent = formatPrice(totalHardware());
    displayTotalBenefits.textContent = formatPrice(totalBenefits());
}

//08. benefits - custom entries

const sectionCustom = document.querySelector("#section--custom");

function createNewRow() {
    const newRow = document.createElement("li");
    newRow.classList.add("wrapper--custom");
    const newCustomPrice = document.createElement("input");
    newCustomPrice.setAttribute("type", "text");
    newCustomPrice.setAttribute("placeholder", "49.5");
    newCustomPrice.classList.add("custom-price");
    const newCustomMonths = document.createElement("input");
    newCustomMonths.setAttribute("type", "text");
    newCustomMonths.setAttribute("placeholder", "M");
    newCustomMonths.classList.add("custom-months");
    const newCustomDays = document.createElement("input");
    newCustomDays.setAttribute("type", "text");
    newCustomDays.setAttribute("placeholder", "D");
    newCustomDays.classList.add("custom-days");
    const newSpanCustom = document.createElement("span");
    newSpanCustom.classList.add("custom", "output-custom");
    newSpanCustom.textContent = formatPrice(0); //formatPrice(custom);
    const buttonRemoveRow = document.createElement("button");
    buttonRemoveRow.setAttribute("type", "button");
    buttonRemoveRow.classList.add("btn", "btn--remove", "btn--alt");
    buttonRemoveRow.textContent = "X";
    buttonRemoveRow.addEventListener("click", () => {
        newRow.remove();
        calculateCustom();
    });
    newRow.appendChild(newCustomPrice);
    newRow.appendChild(newCustomMonths);
    newRow.appendChild(newCustomDays);
    newRow.appendChild(newSpanCustom);
    newRow.appendChild(buttonRemoveRow);
    sectionCustom.appendChild(newRow);
}

const buttonAddRow = document.querySelector(".btn--add");
buttonAddRow.addEventListener("click", () => {
    createNewRow();
    calculateCustom();
});

const displayTotalCustom = document.querySelector("#total-custom");
let totalCustom = 0;
let outputStringCustom = "";
let customCalcPrice = [];
function calculateCustom() { //calculates all custom entries and builds output string
    const customPrice = [...document.querySelectorAll(".custom-price")];
    const customMonths = [...document.querySelectorAll(".custom-months")];
    const customDays = [...document.querySelectorAll(".custom-days")];
    const customOutput = [...document.querySelectorAll(".output-custom")];
    outputStringCustom = "";
    for (let i = 0; i < customPrice.length; i++) {
        customCalcPrice[i] =
            customPrice[i].value * customMonths[i].value +
            (customDays[i].value * (customPrice[i].value / 30));
        customOutput[i].textContent = formatPrice(customCalcPrice[i]);
        if (customMonths[i].value && customDays[i].value) { //builds string 
            outputStringCustom += `MISC. ${+customPrice[i].value} x ${customMonths[i].value} m and ${customDays[i].value} d + `;
        }
        if (customMonths[i].value && !customDays[i].value) {
            outputStringCustom += `MISC. ${+customPrice[i].value} x ${customMonths[i].value} m + `;
        }
        if (customDays[i].value && !customMonths[i].value) {
            outputStringCustom += `MISC. ${+customPrice[i].value} x ${customDays[i].value} d + `;
        }
    }
    totalCustom = customCalcPrice.reduce((acc, curr) => acc + curr, 0);
    displayTotalCustom.textContent = formatPrice(totalCustom);
    return totalCustom;
}

//08a. calculate custom days passed

const dateInputCustom = document.querySelector("#custom-date-input");

const customButtonDate = document.querySelector(".btn--custom-date");
customButtonDate.addEventListener("click", () => {
    setStartYear(dateInputCustom);
    setStartMonth(dateInputCustom);
    setStartDay(dateInputCustom);
    displayCustomTimePassed.textContent = formattedCustomDaysPassed();
});

let customDaysPassed = () => calculateDays(setStartDay(dateInputStart), setStartDay(dateInputCustom), setStartMonth(dateInputStart), setStartMonth(dateInputCustom),
    setStartYear(dateInputStart), setStartYear(dateInputCustom));

let formattedCustomDaysPassed = () =>
    `${Math.floor(customDaysPassed() / 30)} m and ${customDaysPassed() % 30} d`;
const displayCustomTimePassed = document.querySelector("#custom-time-passed");


//09. benefits - promo channels and hardware items

//const inputChannels = [...document.querySelectorAll("input[name='channels']")];
const inputCheckboxes = [
    ...document.querySelectorAll("input[type='checkbox']"),
];
const inputText = [...document.querySelectorAll("input[class='modifier']")];
const inputMultiRent = [
    ...document.querySelectorAll("input[class='multiple-rent']"),
];
const displayTotalChannels = document.querySelector("#total-channels");
const displayTotalHardware = document.querySelector("#total-hardware");

const displayTotalBenefits = document.querySelector("#total-benefits");

let totalPackages = () => calcElementPrice(productPackages);
let totalHardware = () => calcElementPrice(hardwareItems);
let totalBenefits = () =>
    [
        reductionTotal(),
        totalPackages(),
        totalHardware(),
        calculateCustom(),
    ].reduce((acc, curr) => acc + curr, 0);

inputCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function (e) {
        isChecked(e, productPackages);
        displayElementPrice(displaySinglePP, productPackages);
        isChecked(e, hardwareItems);
        displayElementPrice(displaySingleHW, hardwareItems);
        updateDisplayBenefits();
    });
});

function isChecked(e, arr) {
    arr.forEach((elem) => {
        if (elem.name === e.currentTarget.id) {
            if (e.currentTarget.checked && elem.modifier) {
                elem.qty = elem.modifier;
            } else if (e.currentTarget.checked) {
                if (e.currentTarget.name === "calc-by-time") {
                    elem.qty = totalDaysPassed() / 30;
                }
                if (e.currentTarget.name === "calc-by-piece") {
                    elem.qty = 1;
                }
            } else {
                elem.qty = 0;
            }
        }

        calcElementPrice(arr);
    });
}

inputText.forEach((textbox) => {
    textbox.addEventListener("change", function (e) {
        hasValue(e, productPackages);
        displayElementPrice(displaySinglePP, productPackages);
        hasValue(e, hardwareItems);
        displayElementPrice(displaySingleHW, hardwareItems);
        updateDisplayBenefits();
    });
});

inputMultiRent.forEach((multi) => {
    multi.addEventListener("change", function (e) {
        hasMulti(e, hardwareItems);
        displayElementPrice(displaySingleHW, hardwareItems);
        updateDisplayBenefits();
    });
});

function hasValue(e, arr) {
    arr.forEach((elem) => {
        if (elem.name === e.currentTarget.parentNode.firstElementChild.id) {
            if (e.currentTarget.value) {
                elem.modifier = +e.currentTarget.value;
                if ((elem.modifier > totalDaysPassed() / 30) && arr == productPackages) { //error out for channels, not for hardware
                    alert("Wrong entry! The benefit is still active.");
                    e.currentTarget.value = ""; //clear wrong value
                    elem.modifier = null;
                }
            } else {
                elem.modifier = null;
            }
            if (elem.modifier) {
                if (e.currentTarget.parentNode.firstElementChild.checked) {
                    elem.qty = elem.modifier;
                } else {
                    elem.qty = 0;
                }
            } else {
                if (e.currentTarget.parentNode.firstElementChild.checked) {
                    elem.qty = totalDaysPassed() / 30;
                } else {
                    elem.qty = 0;
                }
            }
        }
        calcElementPrice(arr);
    });
}

function hasMulti(e) {
    hardwareItems.forEach((elem) => {
        if (elem.name === e.currentTarget.parentNode.firstElementChild.id) {
            if (e.currentTarget.value) {
                elem.multiplier = +e.currentTarget.value;
            } else {
                elem.multiplier = null;
            }
            if (elem.multiplier) {
                if (e.currentTarget.parentNode.firstElementChild.checked) {
                    elem.qty = (totalDaysPassed() / 30) * elem.multiplier;
                } else {
                    elem.qty = 0;
                }
            } else {
                elem.qty = totalDaysPassed() / 30;
            }
        }
        calcElementPrice(hardwareItems);
    });
}

function calcElementPrice(arr) {
    arr.forEach((elem) => {
        elem.calcPrice = elem.qty * elem.price;
    });
    return arr.reduce((total, element) => total + element.calcPrice, 0);
}

const displaySinglePP = [
    ...document.querySelectorAll("#channels > li > span.channels-calc-price"),
];
const displaySingleHW = [
    ...document.querySelectorAll("#hardware > li > span.hardware-calc-price"),
];

function displayElementPrice(arrOfNodes, arrOfProducts) {
    for (let i = 0; i < arrOfNodes.length; i++) {
        arrOfNodes[i].textContent = arrOfProducts[i].calcPrice.toFixed(2);
    }
}

// 10. build output string

let buildOutputStringTotalLeft = () =>
    `${formatPrice(totalPaymentsLeft())} (${selectedRatePlan
        .replaceAll("-", " ")
        .toUpperCase()} ${formatPrice(currentPrice())} x ${formattedDaysLeft()})`;

let buildOutputStringTotalBenefits = () => {
    let finalStringBenefits = "";
    if (reductionTotal()) {
        if (reductionType.value === "one") {
            finalStringBenefits += `Pay 1 EUR ${formatPrice(reducedPrice())} x`;
        } else if (reductionType.value === "prev") {
            finalStringBenefits += `Pay previous RP price ${formatPrice(
                reducedPrice()
            )} x`;
        } else if (reductionType.value === "percent") {
            finalStringBenefits += `Pay ${percentReduction * 100
                } % of full price ${formatPrice(reducedPrice())} x`;
        } else if (reductionType.value === "ammount") {
            finalStringBenefits += `Pay only ${ammountReduction} EUR" x `;
        }
        if (multiplier) {
            finalStringBenefits += ` ${multiplier} m + `;
        } else {
            finalStringBenefits += ` ${formattedDaysPassed()} + `;
        }
    }
    if (totalPackages()) {
        for (let i = 0; i < productPackages.length; i++) {
            if (productPackages[i].qty) {
                if (productPackages[i].modifier) {
                    finalStringBenefits += `${productPackages[i].name
                        .replaceAll("-", " ")
                        .toUpperCase()} ${formatPrice(productPackages[i].price)} x ${productPackages[i].modifier
                        } m + `;
                } else {
                    finalStringBenefits += `${productPackages[i].name
                        .replaceAll("-", " ")
                        .toUpperCase()} ${formatPrice(
                            productPackages[i].price
                        )} x ${formattedDaysPassed()} + `;
                }
            }
        }
    }
    if (totalHardware()) {
        for (let i = 0; i < hardwareItems.length; i++) {
            if (hardwareItems[i].qty) {
                if (hardwareItems[i].multiplier) {
                    finalStringBenefits += `${hardwareItems[i].name
                        .replaceAll("-", " ")
                        .toUpperCase()} ${formatPrice(
                            hardwareItems[i].price
                        )} x ${formattedDaysPassed()} x ${hardwareItems[i].multiplier} + `;
                } else if (hardwareItems[i].name.includes("rent")) {
                    finalStringBenefits += `${hardwareItems[i].name
                        .replaceAll("-", " ")
                        .toUpperCase()} ${formatPrice(
                            hardwareItems[i].price
                        )} x ${formattedDaysPassed()} + `;
                } else if (hardwareItems[i].modifier) {
                    finalStringBenefits += `${hardwareItems[i].name
                        .replaceAll("-", " ")
                        .toUpperCase()} ${formatPrice(hardwareItems[i].price)} x ${hardwareItems[i].modifier
                        } + `;
                } else {
                    finalStringBenefits += `${hardwareItems[i].name
                        .replaceAll("-", " ")
                        .toUpperCase()} ${formatPrice(hardwareItems[i].price)} + `;
                }
            }
        }
    }
    if (totalCustom) {
        finalStringBenefits += outputStringCustom;
    }
    finalStringBenefits = finalStringBenefits.slice(
        0,
        finalStringBenefits.length - 3
    );
    return finalStringBenefits;
};

// 11. show output

const buttonFinal = document.querySelector(".btn--final");
const outputFinal = document.querySelector("#output--final");
let outputString = "";

buttonFinal.addEventListener("click", function () {
    buildOutputStringTotalLeft();
    buildOutputStringTotalBenefits();
    outputString = `${todayFormatted} - Customer Care Administrator:
  
  Total benefits: ${formatPrice(
        totalBenefits()
    )} (${buildOutputStringTotalBenefits()});
  
  Total payments left: ${buildOutputStringTotalLeft()};`;
    outputFinal.textContent = outputString;
    outputFinal.style.height = "auto";
    outputFinal.style.height = outputFinal.scrollHeight + "px";
});

// 12. clear

const form = document.querySelector("form");
const outputAll = [...document.querySelectorAll(".output")];

function clearAllObjects(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].qty = 0;
        arr[i].modifier = 0;
        arr[i].multiplier = 0;
        calcElementPrice(arr);
        displayElementPrice(displaySinglePP, productPackages);
        displayElementPrice(displaySingleHW, hardwareItems);
    }
}

function clearAll() {
    form.reset();
    dateInputStart.value = "";
    selectedRatePlan = 0;
    multiplier = null;
    while (sectionCustom.firstChild) {
        sectionCustom.removeChild(sectionCustom.lastChild);
    }
    createNewRow();
    clearAllObjects(productPackages);
    clearAllObjects(hardwareItems);
    outputAll.forEach((output) => (output.textContent = ""));
    previousRatePlanInput.style.display = "none";
    percentContainer.style.display = "none";
    ammountContainer.style.display = "none";
    displayToday.textContent = todayFormatted;
    outputFinal.style.height = "auto";
}

const buttonClear = document.querySelector(".btn--clear");
buttonClear.addEventListener("click", clearAll);

clearAll();