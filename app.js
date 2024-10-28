import pkg, { Pool } from 'pg';
const { Pool } = pkg;
import express  from 'express';
const app = express();
app.set('view engine','ejs');

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'student',
    password:'pae1246153',
    port:5432,
})

// ฟังก์ชันสำหรับโหลดข้อมูลการเช็คชื่อจาก Local Storage เมื่อเปิดหน้าเว็บ
function loadAttendance() {
    const attendanceData = JSON.parse(localStorage.getItem("attendanceList")) || [];
    attendanceData.forEach((record) => addAttendanceRow(record.studentId, record.status));
}

// ฟังก์ชันสำหรับเพิ่มข้อมูลนักศึกษาและสถานะในตาราง
function addAttendanceRow(studentId, status) {
    const attendanceTable = document.getElementById("attendanceTable");
    const newRow = attendanceTable.insertRow();

    const cellId = newRow.insertCell(0);
    const cellStatus = newRow.insertCell(1);
    const cellDelete = newRow.insertCell(2);

    cellId.textContent = studentId;
    cellStatus.textContent = status;

    // ปุ่มลบ
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.textContent = "ลบ";
    deleteButton.onclick = () => {
        newRow.remove();
        deleteAttendance(studentId);
    };
    cellDelete.appendChild(deleteButton);

    // บันทึกข้อมูลใน Local Storage
    const attendanceData = JSON.parse(localStorage.getItem("attendanceList")) || [];
    attendanceData.push({ studentId, status });
    localStorage.setItem("attendanceList", JSON.stringify(attendanceData));
}

// ฟังก์ชันสำหรับบันทึกสถานะการเช็คชื่อของนักศึกษา
function checkIn() {
    const studentId = document.getElementById("studentId").value.trim();
    const attendanceStatus = document.getElementById("attendanceStatus").value;

    if (studentId) {
        addAttendanceRow(studentId, attendanceStatus);
        document.getElementById("studentId").value = "";
    } else {
        alert("กรุณากรอกรหัสนักศึกษา!");
    }
}

// ฟังก์ชันลบข้อมูลจาก Local Storage
function deleteAttendance(studentId) {
    let attendanceData = JSON.parse(localStorage.getItem("attendanceList")) || [];
    attendanceData = attendanceData.filter((record) => record.studentId !== studentId);
    localStorage.setItem("attendanceList", JSON.stringify(attendanceData));
}


// โหลดข้อมูลการเช็คชื่อเมื่อเปิดหน้าเว็บ
window.onload = loadAttendance;






