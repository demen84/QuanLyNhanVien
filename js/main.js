import NhanVien from "../js/nhanvien.js";
import DanhSachNhanVien from "../js/danhsachnhanvien.js";
import Validation from "../js/validation.js";

let dsNhanVien = new DanhSachNhanVien();
const validation = new Validation();
const KEY = 'DSNV';

export function getEleId(id) {
    return document.getElementById(id);
}

//Xử lý DOM tới các giá trị
const getValue = (isAdd) => {
    let account = getEleId('tknv').value;
    let fullName = getEleId('name').value;
    let email = getEleId('email').value;
    let password = getEleId('password').value;
    let workday = getEleId('datepicker').value;
    let basicSalrary = getEleId('luongCB').value;
    let position = getEleId('chucvu').value;
    let num_of_wh = getEleId('gioLam').value;

    //Khai báo biến flag
    let isValid = true;

    /** Xử lý kiểm tra (Validation) tài khoản
     * 1. Không được để trống
     * 2. Phải từ 4->6 ký tự
     * 3. Không được trùng với tài khoản đã nhập trước đó
     */
    if (isAdd) {
        isValid &= validation.checkEmpty(account, 'tbTKNV', '(*) Vui lòng nhập tài khoản') && validation.checkCharLength(account, 'tbTKNV', '(*) Tài khoản phải từ 4->6 ký tự', 4, 6) && validation.checkIdExisted(account, dsNhanVien.employees, 'tbTKNV', '(*) Tài khoản này đã tồn tại');
    }

    /** Kiểm tra Tên người dùng
     * 1. Chỉ được nhập chữ
     * 2. Không được để trống
     */
    isValid &= validation.checkEmpty(fullName, 'tbTen', '(*) Vui lòng nhập tên nhân viên');// && validation.checkString(fullName, 'tbTen', '(*) Vui lòng chỉ nhập chữ');

    /** Kiểm tra Email
     * 1. Không được để trống
     * 2. Nhập đúng định dạng email (ex: abc@xyz.com)
     */
    isValid &= validation.checkEmpty(email, 'tbEmail', '(*) Vui lòng nhập email') && validation.checkEmail(email, 'tbEmail', '(*) Vui lòng nhập đúng định dạng email. Vd: abc@xyz.com');

    /** Kiểm tra Password
     * 1. Không được để trống
     * 2. Chứa ít nhất 1 ký tự số, 1 ký tự in HOA, 1 ký tự đặc biệt
     * 3. Độ dài từ 6-10 ký tự tbMatKhau
     */
    isValid &= validation.checkEmpty(password, 'tbMatKhau', '(*) Vui lòng nhập mật khẩu') && validation.checkCharLength(password, 'tbMatKhau', '(*) Mật khẩu phải từ 6-10 ký tự', 6, 10) && validation.checkPassword(password, 'tbMatKhau', '(*) Mật khẩu phải có chữ thường, ít nhất 1 chữ HOA, ít nhất 1 ký tự đặc biệt.');


    /** Kiểm tra Ngày làm
     * 1. Không được để trống
     * 2. Định dạng theo dạng: MM/dd/yyyy
     */
    isValid &= validation.checkEmpty(workday, 'tbNgay', '(*) Ngày làm không được để trống') && validation.checkDateFormat(workday, 'tbNgay', '(*) Vui lòng nhập đúng định dạng mm/dd/yyyy (vd: 06/28/2025)');


    /** Kiểm tra tiền lương
     * 1. Không được để trống
     * 2. Chỉ được nhập số;
     * 3. Giá trị tiền nằm trong khoảng 1.000.000 -> 20.000.000
     */
    isValid &= validation.checkEmpty(basicSalrary, 'tbLuongCB', '(*) Vui lòng nhập tiền lương') && validation.checkAmount(basicSalrary, 1000000, 20000000, 'tbLuongCB', '(*) Tiền lương phải nằm trong khoảng 1.000.000->20.000.000') && validation.checkNumber(basicSalrary, 'tbLuongCB', '(*) Vui lòng chỉ nhập số');


    /** Kiểm tra Chức vụ
     * 1. Chọn chức vụ hợp lệ: Gián đốc/Trưởng phòng/Nhân viên
     */
    isValid &= validation.checkSelectOption('chucvu', 'tbChucVu', '(*) Vui lòng chọn Chức vụ');


    /** Kiểm tra số giờ làm việc
     * 1. Không được để trống
     * 2. Chỉ được nhập số;
     * 3. Số giờ làm nằm trong khoảng 80 -> 200 giờ
     */
    isValid &= validation.checkAmount(num_of_wh, 80, 200, 'tbGiolam', '(*) Số giờ phải nằm trong khoảng 80->200 giờ') && validation.checkEmpty(num_of_wh, 'tbGiolam', '(*) Vui lòng nhập số giờ làm việc') && validation.checkNumber(num_of_wh, 'tbGiolam', '(*) Vui lòng chỉ nhập số');

    //Nếu isInvalid === fales thì dừng, không làm tiếp các lệnh sau
    // if (isValid === false) return;
    //Or:
    if (!isValid) return;

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
    const nhanVien = getValue(true);

    if (!nhanVien) return;

    dsNhanVien.themNhanVien(nhanVien);
    //Xuất/render nhân viên ra giao diện
    renderDSNhanVien(dsNhanVien.employees);

    //Lưu trữ danh sách nhân viên vào localStorage
    // localStorage.setItem(KEY, JSON.stringify(dsNhanVien.employees)); //Kiểu viết 1
    setLocalStorage(dsNhanVien.employees);//Kiểu viết 2
    // getEleId('btnDong').click(); //Đóng modal sau khi thêm nhân viên
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

    //Gọi hàm resetForm để xóa các giá trị trong form
    resetForm();

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
    const nhanVien = getValue(false);

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

/*
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
} */

