document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.querySelector("input[type='text']").value;
    let phone = document.querySelector("input[type='tel']").value;
    let date = document.querySelector("input[type='date']").value;
    let time = document.querySelector("input[type='time']").value;

    let message = `Appointment Request:%0AName: ${name}%0APhone: ${phone}%0ADate: ${date}%0ATime: ${time}`;

    window.open(`https://wa.me/923199608782?text=${message}`, "_blank");
});