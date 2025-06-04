class DanhSachNhanVien {
    constructor() {
        this.employees = []; //employees là 1 mảng chứa danh sách nhân viên
    }

    //Các phương thức Thêm/Xóa/Sửa/Lọc/Tìm kiếm nhân viên
    themNhanVien(nhanVien) {
        this.employees.push(nhanVien);
    }

    //Fine index of employee by account
    findIndex(account) {
        let index = -1;
        for (let i = 0; i < this.employees.length; i++) {
            const nhanVien = this.employees[i];
            if (nhanVien.account === account) {
                index = i;
                break;
            }
        }
        return index;
    }

    xoaNhanVien(account) { //Ta xem account cũng là id (mã) nhân viên
        const viTri = this.findIndex(account);
        //Nếu tìm thấy vị trí của nhân viên trong mảng employees
        if (viTri !== -1) {
            this.employees.splice(viTri, 1);
        }
    }

    getEmployeeByAccount(account) {
        const viTri = this.findIndex(account);
        if (viTri !== -1) {
            return this.employees[viTri];
        }
        return null; //Trả về null nếu không tìm thấy nhân viên
    }

    //Update nhân viên
    capNhatNhanVien(nhanVien) {
        const viTri = this.findIndex(nhanVien.account);
        //Nếu tìm thấy vị trí của nhân viên trong mảng employees
        if (viTri !== -1) {
            this.employees[viTri] = nhanVien; //Cập nhật thông tin nhân viên
        }
    }

    /** Phương thức lọc nhân viên theo chức vụ
     * 1. Xét nếu giá trị cần lọc không phải là chức vụ (Giám đốc, Trưởng phòng, Nhân viên) thì trả về toàn bộ danh sách nhânv viên
     * 2. Khai báo mảng kết quả sau khi lọc Nhân viên kqLocNhanVien = []//mảng rỗng
     * 3. Duyệt qua vòng lặp lấy ra thuộc tính chức vụ (position) so sánh với giá trị mà người dùng chọn, nếu đúng thì add nhân viên có chức vụ cần lọc vào mảng kết quả kqLocNhanVien
     * 4. Trả về danh sách mảng kqLocNhanVien sau khi duyệt qua vòng lặp
     */
    locNhanVienTheoChucVu(chucvu) {
        if (chucvu === 'all') {
            return this.employees; //Nếu không có chức vụ nhân viên thì trả về toàn bộ danh sách
        }
        let kqLocNhanVien = [];
        for (let i = 0; i < this.employees.length; i++) {
            const nhanVien = this.employees[i];
            if (nhanVien.position === chucvu) {
                kqLocNhanVien.push(nhanVien);
            }
        }
        return kqLocNhanVien;
    }


    locNhanVienTheoXepLoai(loaiNV) {
        if (loaiNV === 'all') {
            return this.employees; //Nếu không có loại nhân viên thì trả về toàn bộ danh sách
        }
        let kqLocNhanVien = [];
        for (let i = 0; i < this.employees.length; i++) {
            const nhanVien = this.employees[i];
            if (nhanVien.xepLoai === loaiNV) {
                kqLocNhanVien.push(nhanVien);
            }
        }
        return kqLocNhanVien;
    }

    //Phương thức tìm kiếm nhân viên theo tên
     /**
     *  0. Tạo ra mảng rỗng findEmployees = [];
        1. Duyệt qua mảng này
          1.1 lấy nv = findEmployees[i]
          1.2 Kiểm tra nv.name trùng với keyword
          => true => Thêm nv tìm thấy vào mảng findEmployees

        2. trả mảng findEmployees
     */
    timNhanVienTheoTen(keyword) {
        let findEmployees = [];
        for (let i = 0; i < this.employees.length; i++) {
            const nhanVien = this.employees[i];
            const ten_chu_thuong = nhanVien.fullName.toLowerCase();
            const tukhoa_chu_thuong = keyword.toLowerCase();
            const index = ten_chu_thuong.indexOf(tukhoa_chu_thuong); 

            if (index !== -1) {
                findEmployees.push(nhanVien);
            }
        }
        return findEmployees;
    }

    timNhanVienTheoXepLoai(keyword) {
        let findEmployees = [];
        for (let i = 0; i < this.employees.length; i++) {
            const nhanVien = this.employees[i];
            const xeploai_chu_thuong = nhanVien.xepLoai.toLowerCase();
            const tukhoa_chu_thuong = keyword.toLowerCase();
            const index = xeploai_chu_thuong.indexOf(tukhoa_chu_thuong); 

            if (index !== -1) {
                findEmployees.push(nhanVien);
            }
        }
        return findEmployees;
    }
}

export default DanhSachNhanVien;