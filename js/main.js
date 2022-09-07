'use strict'

// common document options
const documentOptions = {
    headerSliderImagesCount: 3,

}
// // freeze document to prevent changes
// Object.freeze(documentOptions);

// init actionForm submit button
const actionFormSubmitButton = document.getElementById('actionForm_sendButton');
// validation form function 

function validateActionForm() {
    let modalWindowSentFlag;
    //init input constants from html dom
    const firstName = document.getElementById('userFirstName'),
        lastName = document.getElementById('userLastName'),
        email = document.getElementById('userEmail'),
        userMessage = document.getElementById('userMessage');
    const inputsArray = [firstName, lastName, email, userMessage];
    inputsArray.map((elem) => {
        if (!!elem.value.trim()) {
            elem.classList.add('actionForm_formBlock_formContainer_succesInputField');
            modalWindowSentFlag = true;
        }
        else {
            elem.classList.add('actionForm_formBlock_formContainer_errorInputField');
            modalWindowSentFlag = false;
        }
    })
    if (modalWindowSentFlag === true) {
        const actionFormModalWindow = document.getElementById('actionForm_modalWindow');
        const progressBar = document.getElementById('actionForm_modalWindow_progressBar');
        actionFormModalWindow.style.display = 'block';

        let progressBarWidth = 100;
        progressBar.style.width = progressBarWidth + "%";
        const progressBarProcess = setInterval(() => {
            progressBar.style.width = progressBarWidth + "%";
            progressBarWidth -= 1;
            if (progressBarWidth === 0) {
                clearInterval(progressBarProcess);
                inputsArray.map((elem) => {
                    elem.classList.remove('actionForm_formBlock_formContainer_succesInputField');
                })
                actionFormModalWindow.style.display = "none";
            }
        }, 10)
        actionFormSubmitButton.addEventListener('click', validateActionForm);
        return 0;
    }
    else {
        actionFormSubmitButton.addEventListener('click', validateActionForm);
        return 0;

    }
}

actionFormSubmitButton.onclick = function () {
    validateActionForm();
};

// adaptive  

window.onload = function () {
    // header navigation links containter

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
}
