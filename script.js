document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Gửi yêu cầu đến Google Sheets API (Web App)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText); // Dữ liệu trả về từ Google Sheets
            let isValid = false;

            // Kiểm tra tài khoản và mật khẩu
            for (let i = 0; i < data.length; i++) {
                if (data[i].email === username && data[i].password === password) {
                    isValid = true;
                    break;
                }
            }

            // Xử lý kết quả đăng nhập
            if (isValid) {
                window.location.href = 'main.html'; // Chuyển đến trang chính nếu đăng nhập thành công
            } else {
                errorMessage.textContent = 'Tên đăng nhập hoặc mật khẩu không đúng.';
                errorMessage.style.display = 'block'; // Hiển thị thông báo lỗi
            }
        }
    };

    // URL của Web App bạn đã triển khai
    const webAppUrl = 'https://script.google.com/macros/s/AKfycbwrXP4N-BblF4gTpboTBWqhgMRQppbU3fLQZvj5UFuBU9UFn4q8EnDJxYefBXdSVBPvYA/exec';
    xhttp.open("GET", webAppUrl, true); // Gửi yêu cầu GET đến Web App
    xhttp.send();
});

function showCreateAccountForm() {
    alert("Redirect to Create Account page"); // Placeholder cho chức năng tạo tài khoản
}