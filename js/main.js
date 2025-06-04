import NhanVien from "../js/nhanvien.js";
import DanhSachNhanVien from "../js/danhsachnhanvien.js";

let dsNhanVien = new DanhSachNhanVien();
const KEY = 'DSNV';

function getEleId(id) {
    return document.getElementById(id);
}

//Xử lý DOM tới các giá trị
const getValue = () => {
    let account = getEleId('tknv').value;
    let fullName = getEleId('name').value;
    let email = getEleId('email').value;
    let password = getEleId('password').value;
    let workday = getEleId('datepicker').value;
    let basicSalrary = getEleId('luongCB').value;
    let position = getEleId('chucvu').value;
    let num_of_wh = getEleId('gioLam').value;

    //Tạo đối tượng Nhân Viên từ lớp NhanVien
    const nhanVien = new NhanVien(account, fullName, email, password, workday, basicSalrary, position, num_of_wh);
    //Gọi phương thức tính Tổng lương nhân viên
    nhanVien.tinhTongLuong();
    nhanVien.xepLoaiNhanVien();

    return nhanVien;
}

//Render Danh sách Nhân viên
const renderDSNhanVien = (employees) => {
    /**
     * 1. Tạo biến chuỗi chứa giá trị thẻ html noidungHTML
     * 2. Duyệt qua mảng danh sách nhân viên trong DanhSachNhanVien
     *    2.1. Lấy đc nhân viên từ mảng (nhanVien = employees[i])
          2.2. Tạo dòng & cột => tích lũy vào noidungHTML
            noidungHTML += `<tr>
                                <td>${nhanVien.account}</td>
                                ...
                                <td>${nhanVien.xeploai}</td>
                            </tr>`;
    * 3. Gán noidungHTML vào thẻ tbody của table
    */
    let noidungHTML = '';
    for (let i = 0; i < employees.length; i++) {
        let nhanVien = employees[i];
        // <td>${nhanVien.position === 'gd' ? 'Giám đốc' : position === 'tp' ? 'Trưởng phòng' : 'Nhân viên'}</td>
        //<td>${nhanVien.position === 'gd' ? 'Giám đốc' : nhanVien.position === 'tp' ? 'Trưởng phòng' : nhanVien.position === 'nv' ? 'Nhân viên' : 'Chưa chọn chức vụ'}</td>
        noidungHTML += `
            <tr>
                <td>${nhanVien.account}</td>
                <td style="text-align: left;">${nhanVien.fullName}</td>
                <td style="text-align: left;">${nhanVien.email}</td>
                <td>${nhanVien.workday}</td>
                <td>${nhanVien.position === 'gd' ? 'Giám đốc' : nhanVien.position === 'tp' ? 'Trưởng phòng' : 'Nhân viên'}</td>
                <td style="text-align: right;">${nhanVien.tongLuong}</td>
                <td>${nhanVien.xepLoai === 'xs' ? 'Xuất sắc' : nhanVien.xepLoai === 'g' ? 'Giỏi' : nhanVien.xepLoai === 'k' ? 'Khá' : 'Trung bình'}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-success btn-sm" data-toggle="modal" data-target="#myModal" onClick="onEditEmployee('${nhanVien.account}')">Sửa</button>
                        <button class="btn btn-danger btn-sm" onClick="onDeleteEmployee('${nhanVien.account}')">Xóa</button>
                    </div>
                </td>
            </tr>
        `;
    }
    getEleId('tableDanhSach').innerHTML = noidungHTML;
}

//Xử lý click vào nút Thêm nhân viên
getEleId('btnThemNV').onclick = function () {
    // alert('OK nha');
    const nhanVien = getValue();
    dsNhanVien.themNhanVien(nhanVien);
    //Xuất/render nhân viên ra giao diện
    renderDSNhanVien(dsNhanVien.employees);

    //Lưu trữ danh sách nhân viên vào localStorage
    // localStorage.setItem(KEY, JSON.stringify(dsNhanVien.employees)); //Kiểu viết 1
    setLocalStorage(dsNhanVien.employees);//Kiểu viết 2
    getEleId('btnDong').click(); //Đóng modal sau khi thêm nhân viên
}

function setLocalStorage(employees) {
    localStorage.setItem(KEY, JSON.stringify(employees));
}

//Lấy danh sách nhân viên từ localStorage
function getLocalStorage(key) {
    let stringValue = localStorage.getItem(key);
    //Nếu không có dữ liệu trong localStorage thì trả về mảng rỗng
    if (!stringValue) {
        return [];
    }
    //Chuyển dữ liệu từ chuỗi JSON về mảng đối tượng
    let dataJSON = JSON.parse(stringValue);
    //Gán data vào màng employees
    dsNhanVien.employees = dataJSON;

    renderDSNhanVien(dsNhanVien.employees);
}

getLocalStorage(KEY);
//Khi trang web load, lấy danh sách nhân viên từ localStorage
// window.onload = function () {
//     let employees = getLocalStorage();
//     dsNhanVien.employees = employees;
//     renderDSNhanVien(dsNhanVien.employees);
// }

getEleId('btnThem').onclick = function () {
    getEleId('btnCapNhat').style.display = 'none'; //Ẩn nút Cập nhật
    getEleId('btnThemNV').style.display = 'block'; //Hiện nút Thêm nhân viên

    //Set tiêu đề modal
    getEleId('header-title').innerHTML = 'Thêm nhân viên';
    //Cho phép nhập tài khoản
    getEleId('tknv').disabled = false;
    getEleId('tknv').focus(); //Đặt con trỏ vào ô tài khoản - chưa work

    // //Xóa các giá trị trong form
    // getEleId('tknv').value = '';
    // getEleId('name').value = '';
    // getEleId('password').value = '';
    // getEleId('datepicker').value = '';
    // getEleId('luongCB').value = '';
    // getEleId('chucvu').value = 'Chọn chức vụ';
    // getEleId('gioLam').value = '';
    // //Xóa thông báo lỗi
    // getEleId('tbTKNV').innerHTML = '';
    // getEleId('tbTen').innerHTML = '';
    // getEleId('tbEmail').innerHTML = '';
    // getEleId('tbLuong').innerHTML = '';
    // getEleId('tbChucVu').innerHTML = '';
    // getEleId('tbGioLam').innerHTML = '';
    // getEleId('tbXepLoai').innerHTML = '';
    // getEleId('tbPassword').innerHTML = '';
    // getEleId('tbNgay').innerHTML = '';
    // //Ẩn thông báo lỗi
    // getEleId('tbTKNV').style.display = 'none';
    // getEleId('tbTen').style.display = 'none';
    // getEleId('tbEmail').style.display = 'none';
    // getEleId('tbLuong').style.display = 'none';
    // getEleId('tbChucVu').style.display = 'none';
    // getEleId('tbGioLam').style.display = 'none';
    // getEleId('tbXepLoai').style.display = 'none';
    // getEleId('tbPassword').style.display = 'none';
    // getEleId('tbNgay').style.display = 'none';

}

//Xử lý xóa nhân viên
function onDeleteEmployee(account) {
    dsNhanVien.xoaNhanVien(account);
    renderDSNhanVien(dsNhanVien.employees);
    setLocalStorage(dsNhanVien.employees);
}
//Xử lý sửa nhân viên
function onEditEmployee(account) {
    getEleId('btnCapNhat').style.display = 'block'; //Ẩn nút Cập nhật
    getEleId('btnThemNV').style.display = 'none'; //Hiện nút Thêm nhân viên

    //Set tiêu đề modal
    getEleId('header-title').innerHTML = 'Sửa nhân viên';
    //Cho phép nhập tài khoản
    getEleId('tknv').disabled = true; //Không cho phép sửa tài khoản

    const nhanVien = dsNhanVien.getEmployeeByAccount(account);
    if (nhanVien) {
        //Gán giá trị vào các ô input trong form
        getEleId('tknv').value = nhanVien.account;
        getEleId('name').value = nhanVien.fullName;
        getEleId('email').value = nhanVien.email;
        getEleId('password').value = nhanVien.password;
        getEleId('datepicker').value = nhanVien.workday;
        getEleId('luongCB').value = nhanVien.basicSalrary;
        getEleId('chucvu').value = nhanVien.position;
        getEleId('gioLam').value = nhanVien.num_of_wh;

        // //Xóa thông báo lỗi
        // getEleId('tbTKNV').innerHTML = '';
        // getEleId('tbTen').innerHTML = '';
        // getEleId('tbEmail').innerHTML = '';
        // getEleId('tbPassword').innerHTML = '';
        // getEleId('tbNgay').innerHTML
    }
}

//Xử lý sự kiện click vào nút Cập nhật
getEleId('btnCapNhat').onclick = function () {
    const nhanVien = getValue();

    dsNhanVien.capNhatNhanVien(nhanVien);

    renderDSNhanVien(dsNhanVien.employees);

    setLocalStorage(dsNhanVien.employees);

    //Close modal form
    getEleId('btnDong').click();
}

const resetForm = () => {
    //Xóa các giá trị trong form
    getEleId('formNhanVien').reset();
}


window.onDeleteEmployee = onDeleteEmployee; //Để có thể gọi hàm này từ HTML
window.onEditEmployee = onEditEmployee; //Để có thể gọi hàm này từ HTML

// getEleId('btnTimNV').onclick = function () {
//     let xeploai = getEleId('searchName').value;//.toLowerCase();
//     dsNhanVien.locNhanVienTheoXepLoai(xeploai);
//     renderDSNhanVien(dsNhanVien.employees);
// }

//Xử lý tìm kiếm nhân viên theo tên
getEleId('searchName').addEventListener('keyup', () => {
    const tuKhoa = getEleId('searchName').value;
    // console.log(tuKhoa);
    const timNV = dsNhanVien.timNhanVienTheoTen(tuKhoa);
    renderDSNhanVien(timNV);
});

getEleId('chucVuNhanVien').onchange = function () {
    const chucvu = getEleId('chucVuNhanVien').value;
    // console.log(chucvu); //xuất ra kq là gd/tp/nv

    //Gọi phương tức Lọc nhân viên theo chức vụ
    const arrFiltered = dsNhanVien.locNhanVienTheoChucVu(chucvu)
    //Xuất lại danh sách sau khi lọc
    renderDSNhanVien(arrFiltered);
}

getEleId('xepLoai').onchange = function () {
    const xeploai = getEleId('xepLoai').value;
    // console.log(xeploai);
    
    //Gọi phương tức Lọc nhân viên theo xếp loại
    const arrFiltered = dsNhanVien.locNhanVienTheoXepLoai(xeploai)
    //Xuất lại danh sách sau khi lọc
    renderDSNhanVien(arrFiltered);
}

//Validation account & password
function validateAccount() {
    let account = getEleId("tknv").value;
    let accountRegex = /^[0-9]{4,6}$/;

    if (!accountRegex.test(account)) {
        alert("Tài khoản phải gồm 4-6 ký số và không được để trống!");
        return false;
    }
    return true;
}

function validatePassword() {
    let password = document.getElementById("password").value;
    let passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[\W_]).{6,10}$/;

    if (!passwordRegex.test(password)) {
        alert("Mật khẩu phải từ 6-10 ký tự, chứa ít nhất 1 số, 1 chữ cái in hoa và 1 ký tự đặc biệt!");
        return false;
    }
    return true;
}

function validateEmail() {
    let email = getEleId("email").value;
    let emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //email có chứa ký hiệu %

    if (!emailRegex.test(email)) {
        alert("Email không hợp lệ! Vui lòng nhập đúng định dạng (vd: example@gmail.com)");
        return false;
    }
    return true;
}

function validateSoGioLam() {
    let soGio = document.getElementById("gioLam").value;

    if (soGio === "" || isNaN(soGio) || soGio < 80 || soGio > 200) {
        alert("Số giờ làm việc phải nằm trong khoảng từ 80 đến 200!");
        return false;
    }
    return true;
}



function validateForm() {
    return validateAccount() && validatePassword();
}

