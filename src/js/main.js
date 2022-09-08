'use strict'

// common document options

// init actionForm submit button
const actionFormSubmitButton = document.getElementById('actionForm_sendButton');
// validation form function 

function validateActionForm() {
    const successfullSendModalContainer = document.getElementsByClassName("actionForm_modalWindow")[0];
    if (successfullSendModalContainer.style.display === "block") {
        return;
    }
    let successInputFlag = true;
    //init input constants from html dom
    const firstName = document.getElementById('userFirstName'),
        lastName = document.getElementById('userLastName'),
        email = document.getElementById('userEmail'),
        userMessage = document.getElementById('userMessage');
    const inputsArray = [firstName, lastName, email, userMessage];
    inputsArray.map((elem) => {
        if (!!elem.value.trim()) {
            elem.classList.add('actionForm_formBlock_formContainer_succesInputField');
        }
        else {
            elem.classList.add('actionForm_formBlock_formContainer_errorInputField');
            successInputFlag = false;
        }
    })

    if (successInputFlag === true) {
        const actionFormModalWindow = document.getElementById('actionForm_modalWindow');
        const progressBar = document.getElementById('actionForm_modalWindow_progressBar');
        actionFormModalWindow.style.display = 'block';

        let progressBarWidth = 100;
        progressBar.style.width = progressBarWidth + "%";
        const progressBarProcess = setInterval(() => {
            progressBar.style.width = progressBarWidth + "%";
            progressBarWidth -= 1;
            if (progressBarWidth === 0) {
                inputsArray.map((elem) => {
                    elem.classList.remove("actionForm_formBlock_formContainer_succesInputField");
                    elem.classList.remove("actionForm_formBlock_formContainer_errorInputField");
                })
                actionFormModalWindow.style.display = "none";
                actionFormSubmitButton.addEventListener('click', validateActionForm);
                clearInterval(progressBarProcess);
                return 0;
            }
        }, 10)

    }
    else {
        actionFormSubmitButton.addEventListener('click', validateActionForm);
        return 0;

    }
}
//function to smooth scroll 
function smoothScroll() {
    const whatWeDoSection = document.getElementsByClassName("whatWeDo");
    window.scrollTo({
        top: whatWeDoSection.getBoundingClientRect().y,
        left: 0,
        behavior: 'smooth'
    });
}

// function to roll slider by dots
function rollSlider(dotNum, dotsArray) {
    let currentActiveDot;
    dotsArray.map((elem) => {
        if (dotsArray.indexOf(elem) + 1 === dotNum) {
            elem.setAttribute("src", "./public/images/activeSliderButton.svg");
            currentActiveDot = dotsArray.indexOf(elem) + 1;
        }
        else {
            elem.setAttribute("src", "./public/images/sliderButton.svg");
        }
    })
    const sliderContainer = document.getElementsByClassName("header_offerSlider")[0];
    const sliderElement = document.getElementsByClassName("header_offerSlideElement")[0];
    const sliderLine = document.getElementsByClassName("header_offerSlider_sliderLine")[0];
    sliderLine.style.transition = "0.5s";
    sliderLine.style.marginLeft = -(dotNum * sliderElement.offsetWidth) + sliderElement.offsetWidth + "px";

}

// init slider dots 
function initSliderDots(sliderCountElements, defaultAcitiveSlide) {
    const externalSliderContainer = document.getElementsByClassName("header_offerSlider_slider")[0];
    const dotsArray = [];
    for (let i = 1; i <= sliderCountElements; i++) {
        const dot = document.createElement("img");
        if (i === defaultAcitiveSlide) {
            dot.setAttribute("src", "./public/images/activeSliderButton.svg");
        }
        else {
            dot.setAttribute("src", "./public/images/sliderButton.svg");
        }
        dot.classList.add("header_offerSlider_slider_elem");
        dot.addEventListener('click', () => {
            rollSlider(i, dotsArray);
        })
        dot.setAttribute("id", i);
        dotsArray.push(dot);
    }
    dotsArray.map((elem) => {
        externalSliderContainer.append(elem);
    })
}

actionFormSubmitButton.onclick = function () {
    validateActionForm();
};

// adaptive  

window.onload = function () {
    // header navigation links containter
    const documentOptions = {
        headerSliderImagesCount: 3,
        defaultAcitiveSlide: 1,
    }
    if (window.innerWidth <= 1200) {
        const navigationContainer = document.getElementsByClassName('header_navigationWrapper_nav')[0];
        navigationContainer.style.display = "none";
        // search hamburger menu
        const additionalMobileMenu = document.getElementsByClassName("header_navigationWrapper_additionalMobileMenu")[0];
        const hamburgerMenu = document.getElementsByClassName("header_navigationWrapper_hamburgerNav")[0];
        hamburgerMenu.style.display = "block";
        // select additional mobile menu overlay which need to close additional menu
        const additionalMobileMenuOverlay = document.getElementsByClassName("header_navigationWrapper_additionalMenuOverlay")[0];
        hamburgerMenu.onclick = (() => {
            additionalMobileMenu.style.display = "flex";
            additionalMobileMenuOverlay.style.display = "block";
        })

        additionalMobileMenuOverlay.onclick = (() => {
            additionalMobileMenuOverlay.style.display = "none";
            additionalMobileMenu.style.display = "none";
        })
        // select close button in additional mobile menu
        const closeButton = document.getElementsByClassName("header_navigationWrapper_additionalMobileMenu_closeButton")[0];
        closeButton.onclick = (() => {
            additionalMobileMenuOverlay.style.display = "none";
            additionalMobileMenu.style.display = "none";
        })

    }
    // video block 
    if (window.innerWidth <= 1500) {
        // search and remove video container
        const videoContainer = document.getElementsByClassName('videoInfo_videoBlock')[0];
        videoContainer.remove();
        // search subtitleVideoBlock elem, create new video container and past under video button
        const buttonVideoBlock = document.getElementsByClassName('videoInfo_textBlock_button')[0];
        // get video button current width and margin top
        buttonVideoBlock.style.width = 200 + "px";
        buttonVideoBlock.style.margin = "40px auto"
        const newVideoContainer = document.createElement('video');
        const newVideoElem = document.createElement('source');
        newVideoContainer.classList.add('videoInfo_videoBlock');
        newVideoContainer.setAttribute("controls", "")
        newVideoElem.setAttribute("type", "video/mp4");
        newVideoElem.setAttribute("src", "./public/videos/No_Copyright_Video_-_Sea_View___Landscape_-_short_clip.mp4");
        // past source elem into video elem
        newVideoContainer.appendChild(newVideoElem);
        //past video under  video button  block elem
        buttonVideoBlock.before(newVideoContainer);
        // search all text block in video section to styles it
        const videoSectionTextBlock = document.getElementsByClassName('videoInfo_textBlock')[0];
        videoSectionTextBlock.style.marginRight = "0px";
        videoSectionTextBlock.style.display = "flex";
        videoSectionTextBlock.style.flexDirection = "column";
    }
    // init slider dots
    initSliderDots(documentOptions.headerSliderImagesCount, documentOptions.defaultAcitiveSlide);

    // smooth scroll

    const smoothScrollButton = document.getElementsByClassName("header_smoothScrolling_button")[0];
    const whatWeDoSection = document.getElementsByClassName("whatWeDo")[0];
    smoothScrollButton.onclick = (() => {

        const headerSection = document.getElementsByClassName("header")[0];
        const offerNumsSection = document.getElementsByClassName("offerNums")[0];
        const currentWindowPosition = window.pageYOffset;
        console.log(currentWindowPosition);
        const commonHeaderAndOfferNumsSectionsHeight = headerSection.offsetHeight + offerNumsSection.offsetHeight;
        console.log(commonHeaderAndOfferNumsSectionsHeight);
        let counter = currentWindowPosition;
        const scrollingProcces = setInterval(() => {
            if (counter > commonHeaderAndOfferNumsSectionsHeight * 1.3) {
                clearInterval(scrollingProcces);
            }
            window.scrollTo({
                top: counter,
            })
            counter += 20;
        }, 10)
    })
}





