// API Key và ID của bảng tính Google Sheets
const apiKey = 'AIzaSyCJOJPD0urzoEzIAXiODvGtcba2cHOuSro';  // Thay bằng API Key của bạn
const spreadsheetId = '1cyCSxXcWiI_nqEl4LerXLLfScGWvYCEapAYidAw5RX8';  // Thay bằng ID bảng tính của bạn

// chat gpt hay có ghi chú kiểu này
function getStatistics() {
    const date = document.getElementById('date').value; 
    const range = `Sheet1!A:F`;  

    if (!date) {
        alert('Vui lòng chọn ngày');
        return;
    }

    // Gọi Google Sheets API để lấy dữ liệu
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            const filteredData = rows.filter(row => row[0] === date);  
            displayStatistics(filteredData);
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu từ Google Sheets:', error);
            alert('Có lỗi xảy ra khi lấy dữ liệu.');
        });
}

// Hàm hiển thị thống kê lên giao diện
function displayStatistics(data) {
    const content = document.getElementById('statisticsContent');
    content.innerHTML = '';  

    if (data.length === 0) {
        content.innerHTML = '<p>Không có dữ liệu cho ngày đã chọn.</p>';
    } else {
        let html = '<table><tr><th>Ngày</th><th>Số lượng</th><th>Red</th><th>Green</th><th>Blue</th><th>Eror</th></tr>';

        
        data.forEach(row => {
            html += `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td>${row[4]}</td><td>${row[5]}</td></tr>`;
        });

        html += '</table>';
        content.innerHTML = html;
    }
}
