const venom = require('venom-bot');

class venomClient{
    createVenomClient() {
        return new Promise((resolve, reject) => {
            venom.create(
                'bot',
                (base64Qrimg, asciiQR, attempts, urlCode) => {
                    this.handleQRCode(base64Qrimg, asciiQR, attempts, urlCode);
                },
                (statusSession, session) => {
                    this.handleSessionStatus(statusSession, session);
                },
                (browser, waPage) => {
                    this.handleBrowser(browser, waPage);
                }
            )
            .then(resolve)
            .catch(reject);
        });
    }

    handleQRCode(base64Qrimg, asciiQR, attempts, urlCode) {
        console.log('Número de tentativas de leitura do qrcode: ', attempts);
        console.log('Terminal qrcode: ', asciiQR);
        console.log('base64 image string qrcode: ', base64Qrimg);
        console.log('urlCode (data-ref): ', urlCode);
    }
    
    handleSessionStatus(statusSession, session) {
        console.log('Status Session: ', statusSession);
        console.log('Session name: ', session);
    }
    
    handleBrowser(browser, waPage) {
        console.log('Browser PID:', browser.process().pid);
        waPage.screenshot({ path: 'screenshot.png' });
    }
}

module.exports = { venomClient };