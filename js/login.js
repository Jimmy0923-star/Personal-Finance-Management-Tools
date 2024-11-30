document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    // 預設的測試帳號密碼
    const validUsername = "admin";
    const validPassword = "1234";

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // 阻止表單默認行為

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === validUsername && password === validPassword) {
            // 登入成功，跳轉到主頁
            window.location.href = "main.html"; // 理財工具主頁
        } else {
            // 顯示錯誤訊息
            errorMessage.style.display = "block";
        }
    });
});
