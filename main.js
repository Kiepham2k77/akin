// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBWXObaYok2OlQa5BcRBhhDpsbc7CFEYrQ",
    authDomain: "khkt-fb906.firebaseapp.com",
    databaseURL: "https://khkt-fb906-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "khkt-fb906",
    storageBucket: "khkt-fb906.firebasestorage.app",
    messagingSenderId: "843931539573",
    appId: "1:843931539573:web:0c391975bd7d4ab4dc003c"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

// Cập nhật trạng thái băng chuyền
function updateStatus() {
    const conveyor1Ref = database.ref('conveyor1/status');
    const conveyor2Ref = database.ref('conveyor2/status');

    // Lắng nghe sự thay đổi trong Firebase
    conveyor1Ref.on('value', snapshot => {
        const data = snapshot.val();
        document.getElementById('status1-running').innerText = data.runningStatus;
        document.getElementById('status1-color').innerText = data.color;
        document.getElementById('status1-passed1').innerText = data.passed1;
        document.getElementById('status1-passed2').innerText = data.passed2;
        document.getElementById('status1-grab').innerText = data.grabStatus;
    });

    conveyor2Ref.on('value', snapshot => {
        const data = snapshot.val();
        document.getElementById('status2-running').innerText = data.runningStatus;
        document.getElementById('status2-quantity').innerText = data.quantity;
        document.getElementById('status2-packages').innerText = data.packages;
    });
}

// Gọi hàm updateStatus khi trang web tải
window.onload = updateStatus;
