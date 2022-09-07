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