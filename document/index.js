
module.exports = ({ username, password, qrCode }) => {
    // console.log(username, password, qrCode)
    return `
    <!DOCTYPE html><html>
    <head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100&family=Ubuntu:wght@300&display=swap" rel="stylesheet">
    
    </head>
    <body>
    <div class="wrapper">
        <div class="acces">Доступ к сайту викторины</div>
        <div class="site">викторина.родныеигры.рф</div>
        <div class="wrapper_login">
            <span class="login">Логин: </span>
            <span class="login_value">${username}</span>
        </div>
        <div class="wrapper_password">
            <span class="password">Пароль: </span>
            <span class="password_value">${password}</span></div>
        </div>
        <div class="auto_registration">QR-код <br/> для автоматической авторизации на сайте:</div>
        <div class="svg_qr">
         ${qrCode}
        </div>
    
    </div>
        
        <style>
       .body{
          color: rgba(43,42,41,1);     
          font-size: 8pt;
          opacity: 1;
          text-align: center;
          font-style:normal;
           line-height: 1;
          /*font-family: 'Montserrat', sans-serif;*/
            font-family: 'Ubuntu', sans-serif;
       }
        .svg_qr{
           display: block;
           margin: -30pt auto;
           width: 100pt;
        }
        .svg_qr svg{
        width: 100%;
        }
        .wrapper_password,
        .wrapper_login,
        .site,
        .acces, 
        .auto_registration{
            text-align: center;
            padding:3pt;
                
             font-weight: 200;
        }
        .acces{
            
            margin-top: 40pt;
             font-weight: 200;
        }
        .site,
        .password_value,
        .login_value{
            font-weight: 600;
             
           
        }
        .auto_registration{
        
            margin: 40pt auto 0 auto;
           
        }
    
        </style>
    </body></html>
    `;
};

// <h1 className="justify-center">Total price: ${parseInt(price1) + parseInt(price2)}$</h1>