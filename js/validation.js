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
            getEleId(idNoti).innerHTML = message;
            getEleId(idNoti).style.display = 'block';
            return false;
        }
        getEleId(idNoti).innerHTML = '';
        getEleId(idNoti).style.display = 'none';
        return true;
    }

    checkString(value, idNoti, message) {
        const regex = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        //const regex = ^[\p{L}\s]+$; // Regex cho phép chữ cái và khoảng trắng, sử dụng Unicode
        if (value.match(regex)) {
            getEleId(idNoti).innerHTML = '';
            getEleId(idNoti).style.display = 'none';
            return true;
        }
        getEleId(idNoti).innerHTML = message;
        getEleId(idNoti).style.display = 'block';
        return false;
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


    checkPassword(value, idNoti, message) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,10}$/;
        if (value.match(regex)) {
            getEleId(idNoti).innerText = '';
            getEleId(idNoti).style.display = 'none';
            return true;
        }
        getEleId(idNoti).innerText = message;
        getEleId(idNoti).style.display = 'block';
        return false;
    }

    checkDateFormat(value, idNoti, message) {
        const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/[0-9]{4}$/;
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
        if (!isNaN(value) && (value < min || value > max)) {
            // return { valid: false, error: 'Giá trị không hợp lệ. Vui lòng chỉ nhập số!' };
            getEleId(idNoti).innerHTML = message;
            getEleId(idNoti).style.display = 'block';
            return false;
        }
        getEleId(idNoti).innerHTML = '';
        getEleId(idNoti).style.display = 'none';
        return true;
    }

    checkNumber(value, idNoti, message) {
        const regex = /^\d+$/;
        if (value.match(regex)) {
            getEleId(idNoti).innerText = '';
            getEleId(idNoti).style.display = 'none';
            return true;
        }
        getEleId(idNoti).innerText = message;
        getEleId(idNoti).style.display = 'block';
        return false;
    }

    // checkSoGioLam(soGioLam, min, max, idNoti, message) {
    //     const value = parseFloat(soGioLam);

    //     if (!isNaN(value) && (value < min || value > max)) {
    //         getEleId(idNoti).innerHTML = message;
    //         getEleId(idNoti).style.display = 'block';
    //         return false;
    //     }
    //     getEleId(idNoti).innerHTML = '';
    //     getEleId(idNoti).style.display = 'none';
    //     return true;
    // }
}

export default Validation;