function submitForm() {
    const form = document.getElementById('dataForm');
    const  formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    //change script web app URL
    fetch('https://script.google.com/macros/s/AKfycbwoA66-sn5ZkKKdahgwDc4nYlSCV-xwgCQy6OARLxvPRNPXi5H6UbATe6e2uZ2Q3G9w/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data)
    })
    .then(response => response.text())
    .then(result => console.log('Submitted successfully: ', result))
    .catch(error => console.error('Error:', error));
}


function toggleHealthFields(selectElement) {
    const healthInsuranceFields = document.getElementById("healthInsuranceFields");
    if (selectElement.value === "yes") {
        healthInsuranceFields.style.display = "block";
    } else {
        healthInsuranceFields.style.display = "none";
    }
}


function setDateToToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    document.getElementById('dataInscricao').value = formattedDate;
}

window.onload = () => {
    setDateToToday();
};

document.getElementById('numeroCPF').addEventListener('input', function(event) {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 9) {
      value = value.substring(0, 9) + '-' + value.substring(9);
    }
    this.value = value;
  });


  function submitForm() {
    const form = document.getElementById('dataForm');
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('https://script.google.com/macros/s/AKfycbwoA66-sn5ZkKKdahgwDc4nYlSCV-xwgCQy6OARLxvPRNPXi5H6UbATe6e2uZ2Q3G9w/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data)
    })
    .then(response => response.text())
    .then(result => {
        // Display a pop-up message
        displayConfirmationPopup("Formulário enviado com sucesso!");
        console.log('Submitted successfully: ', result);
    })
    .catch(error => {
        // Display an error message
        displayErrorPopup("Erro ao enviar o formulário. Por favor, tente novamente.");
        console.error('Error:', error);
    });
}

// Function to display a confirmation pop-up
function displayConfirmationPopup(message) {
  const popup = document.createElement('div');
  popup.id = 'confirmationPopup';
  popup.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const popupContent = document.createElement('div');
  popupContent.style.cssText = `
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  `;

  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  popupContent.appendChild(messageElement);

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Fechar';
  closeButton.style.cssText = `
    margin-top: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
  `;
  closeButton.addEventListener('click', () => {
    document.body.removeChild(popup);
  });
  popupContent.appendChild(closeButton);
  popup.appendChild(popupContent);
  document.body.appendChild(popup);
}