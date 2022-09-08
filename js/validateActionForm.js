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
export default validateActionForm;