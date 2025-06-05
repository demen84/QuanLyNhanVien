import { getEleId } from "./main.js";

class Validation {
    // constructor(value, regex) {
    //     this.value = value;
    //     this.regex = regex;
    // }

    /**
     * 
     * @param {*} value : là giá trị mà người dùng nhập vào
     * @param {*} idNoti : là id của element
     * @param {*} message : là câu thông báo cho người dùng nhìn thấy
     * @returns boolean
     */
    checkEmpty(value, idNoti, message) {
        // let isValid = true;
        if (value === '') {
            document.getElementById(idNoti).innerHTML = message;
            document.getElementById(idNoti).style.display = 'block';
            return false;
        }
        document.getElementById(idNoti).innerHTML = '';
        document.getElementById(idNoti).style.display = 'none';
        return true;
    }

    checkString(value, idNoti, message) {
        const regex = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"; // Regex cho phép chữ cái và khoảng trắng
        if (value.match(regex)) {
            document.getElementById(idNoti).innerHTML = '';
            document.getElementById(idNoti).style.display = 'none';
            return true;
        }
        document.getElementById(idNoti).innerHTML = message;
        document.getElementById(idNoti).style.display = 'block';
        return true;
    }

    checkCharLength(value, idNoti, message, minLength, maxLength) {
        if (value.trim().length <= maxLength && value.trim().length >= minLength) {
            getEleId(idNoti).innerHTML = '';
            getEleId(idNoti).style.display = 'none';
            return true;
        }
        getEleId(idNoti).innerHTML = message;
        getEleId(idNoti).style.display = 'block';
        return false;
    }

    checkEmail(value, idNoti, message) {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(regex)) {
            getEleId(idNoti).innerText = '';
            getEleId(idNoti).style.display = 'none';
            return true;
        }
        getEleId(idNoti).innerText = message;
        getEleId(idNoti).style.display = 'block';
        return false;
    }

    checkIdExisted(value, arr, idNoti, message) {
        // const exist = arr.some(item => item.account === value);
        // if (exist) {
        //     getEleId(idNoti).innerHTML = message;
        //     getEleId(idNoti).style.display = 'block';
        //     return false;
        // }
        // getEleId(idNoti).innerHTML = '';
        // getEleId(idNoti).style.display = 'none';
        // return true;

        let isExist = false;
        for (let i = 0; i < arr.length; i++) {
            const nhanVien = arr[i];
            if (nhanVien.account === value) {
                isExist = true;
                break;
            }
        }
        if (isExist) {
            getEleId(idNoti).innerHTML = message;
            getEleId(idNoti).style.display = 'block';
            return false;
        }
        getEleId(idNoti).innerHTML = '';
        getEleId(idNoti).style.display = 'none';
        return true;
    }

    checkSelectOption(idSelectTag, idNoti, message) {
        if (getEleId(idSelectTag).selectedIndex !== 0) {
            getEleId(idNoti).innerHTML = '';
            getEleId(idNoti).style.display = 'none';
            return true;
        }
        getEleId(idNoti).innerHTML = message;
        getEleId(idNoti).style.display = 'block';
        return false;
    }

    checkAmount(amount, min, max, idNoti, message) {
        const value = parseFloat(amount);
        if (isNaN(value) && (value < min || value > max)) {
            // return { valid: false, error: 'Giá trị không hợp lệ. Vui lòng chỉ nhập số!' };
            getEleId(idNoti).innerHTML = message;
            getEleId(idNoti).style.display = 'block';
            return false;
        }
        // if (value < min || value > max) {
        //     // return { valid: false, error: message || 'Vui lòng nhập số tiền từ 1.000.000 -> 20.000.000' };
        //     getEleId(idNoti).innerHTML = message;
        //     getEleId(idNoti).style.display = 'block';
        //     return false;
        // }
        getEleId(idNoti).innerHTML = '';
        getEleId(idNoti).style.display = 'none';
        return true;
    }
}

export default Validation;