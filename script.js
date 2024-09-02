function ligarledVerde() {
    enviarComando('ligar_led_verde');
};

function desligarledVerde() {
    enviarComando('desligar_led_verde');
};

function ligarledVermelho(){
    enviarComando('ligar_led_vermelho');
};
function desligarledVermelho(){
    enviarComando('desligar_led_vermelho');
};

function fazerPiscar(){
    enviarComando('fazerPiscar');
}


//aqui está o código do sensor de temperatura
async function obterTemperatura() {
    try {
        const response = await fetch('https://74f8-2804-25ac-306-da00-d8df-aba7-a97e-ad1c.ngrok-free.app');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.temperatura;
    } catch (error) {
        console.error('Erro ao obter a temperatura do sensor: ', error);
        return 'Erro';
    }
}

function atualizaTemp() {
    obterTemperatura().then(temperatura => {
        document.getElementById("temperatura").innerText = temperatura;
    });
}

//atualiza a temperatura a cada 2 segundos
setInterval(atualizaTemp, 2000);

//atualiza a temperatura pela primeira vez
atualizaTemp();


//-------------------------------------------

function enviarComando(comando) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState ==  XMLHttpRequest.DONE) {
            if (xhttp.status == 200) {
                console.log("Comando enviado: " + comando);
            } else {
                console.log("Erro ao enviar comando: " + xhttp.status);
            }
        }
    }

    xhttp.open("POST", "http://192.168.18.164/control", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.send("comando=" + comando);
};

console.log("Jhonatan, o javascript foi iniciado!");



