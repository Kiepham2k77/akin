// Cấu hình Firebase của bạn
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

// Hàm điều khiển băng chuyền
function controlBelt(command) {
    const commandRef = firebase.database().ref('conveyorBelt/commands');
    commandRef.set({
        command: command
    }).then(() => {
        console.log('Command sent:', command);
        updateStatus(command);
    }).catch((error) => {
        console.error('Error sending command:', error);
    });
}

// Cập nhật trạng thái băng chuyền
function updateStatus(command) {
    const statusElement = command === 'start1' || command === 'stop1' ? document.getElementById('beltStatus1') : document.getElementById('beltStatus2');
    statusElement.textContent = command === 'start1' || command === 'start2' ? 'Đang hoạt động' : 'Đã dừng lại';
}

// Lắng nghe các lệnh từ Firebase
const commandRef = firebase.database().ref('conveyorBelt/commands');
commandRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        console.log('Received command:', data.command);
        updateStatus(data.command);
    }
});