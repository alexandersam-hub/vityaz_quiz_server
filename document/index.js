
module.exports = ({ username, password, qrCode }) => {
    // console.log(username, password, qrCode)
    return `
    <!DOCTYPE html><html>
    <head>
<!--        <link rel="preconnect" href="https://fonts.gstatic.com">-->
        <link href="https://quiz.vityazgroup.ru/fonts/gilroy/stylesheet.css" rel="stylesheet">
    
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
          font-size: 4px;
          opacity: 1;
          text-align: center;
          font-style:normal;
       }
        .svg_qr{
           display: block;
           margin: -30px auto;
           width: 200px;
        }
        .wrapper_password,
        .wrapper_login,
        .site,
        .acces, 
        .auto_registration{
            text-align: center;
            padding:3px;
              font-family: 'Gilroy',sans-serif;
             font-weight: 200;
        }
        .acces{
            font-family: 'Gilroy',sans-serif;
            margin-top: 40px;
             font-weight: 200;
        }
        .site,
        .password_value,
        .login_value{
            font-weight: 600;
             font-family: 'Gilroy',sans-serif;
           
        }
        .auto_registration{
            width: 100px;
            margin: 40px auto 0 auto;
           
        }
    
        </style>
    </body></html>
    `;
};

// <h1 className="justify-center">Total price: ${parseInt(price1) + parseInt(price2)}$</h1>