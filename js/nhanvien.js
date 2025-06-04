const CHUC_VU_1 = 'Giám đốc';
const CHUC_VU_2 = 'Trưởng phòng';
const CHUC_VU_3 = 'Nhân viên';

const CHUC_VU = ['gd', 'tp', 'nv'];

// const luongTheoChucVu = 
// {
//     'Giám đốc': {luongCoBan: 10000, heso: 3},
//     'Trưởng phòng': {luongCoBan: 7000, heso: 3},
//     'Nhân viên': {luongCoBan: 5000, heso: 1}
// };
// function tinhLuong(position) {
//     let chucVu = luongTheoChucVu[position];

//     if (chucVu) {
//         return chucVu.luongCoBan * chucVu.heSo;
//     } else {
//         return "Không xác định"; // Trường hợp chức vụ không có trong danh sách
//     }
// }

const XEPLOAI = ['xs', 'g', 'k', 'tb'];
const XEP_LOAI_1 = 'xs';//'Xuất sắc';
const XEP_LOAI_2 = 'g';//Giỏi';
const XEP_LOAI_3 = 'k';//'Khá';
const XEP_LOAI_4 = 'tb';//'Trung bình';

const SO_GIO_LAM_1 = 192;
const SO_GIO_LAM_2 = 176;
const SO_GIO_LAM_3 = 160;

//Khai báo đối tượng Nhân Viên
class NhanVien {
    constructor(account, fullName, email, password, workday, basicSalrary, position, num_of_wh) {
        this.account = account;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.workday = workday;
        this.basicSalrary = basicSalrary;
        this.position = position;
        this.num_of_wh = num_of_wh;
        this.tongLuong = 0;
        this.xepLoai = '';
    }

    //Phương thức tính Tổng lương
    tinhTongLuong() {
        // this.tongLuong = this.basicSalrary * this.num_of_wh;
        switch (this.position) {
            case CHUC_VU[0]:
                this.tongLuong = this.basicSalrary * 3;
                break;
            case CHUC_VU[1]:
                this.tongLuong = this.basicSalrary * 2;
                break;
            case CHUC_VU[2]:
                this.tongLuong = this.basicSalrary * 1;
                break;
        }
    }

    //Phương thức xếp loại Nhân viên
    xepLoaiNhanVien() {
        if (this.num_of_wh >= SO_GIO_LAM_1) {
            this.xepLoai = XEPLOAI[0];//XEP_LOAI_1;
        } else if (this.num_of_wh >= SO_GIO_LAM_2) {
            this.xepLoai = XEPLOAI[1];//XEP_LOAI_2;
        } else if (this.num_of_wh >= SO_GIO_LAM_3) {
            this.xepLoai = XEPLOAI[2];//XEP_LOAI_3;
        } else {
            this.xepLoai = XEPLOAI[3];//XEP_LOAI_4;
        }
    }
}


export default NhanVien;