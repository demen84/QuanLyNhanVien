
class Validation {
    constructor(value, regex) {
        this.value = value;
        this.regex = regex;
    }

    checkEmpty(value, idNoti, message) {
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
        const regex = /^[a-zA-ZÀ-ÿ\s]+$/; // Regex cho phép chữ cái và khoảng trắng
        if (value.natch(regex)) {
            document.getElementById(idNoti).innerHTML = '';
            document.getElementById(idNoti).style.display = 'none';
            return true;
        }
        document.getElementById(idNoti).innerHTML = message;
        document.getElementById(idNoti).style.display = 'block';
        return true;
    }

    CheckExits(value, arr, idNoti, message) {
        // const exists = arr.some(item => item.account === value);
        // if (exists) {
        //     document.getElementById(idNoti).innerHTML = message;
        //     document.getElementById(idNoti).style.display = 'block';
        //     return false;
        // }
        // document.getElementById(idNoti).innerHTML = '';
        // document.getElementById(idNoti).style.display = 'none';
        // return true;

        const isExists = false;
        for (let i = 0; i < arr.length; i++) {
            const food = arr[i];
            if (food.id === value) {
                isExists = true;
                break;
            }
        }
        if (isExists) {
            document.getElementById(idNoti).innerHTML = message;
            document.getElementById(idNoti).style.display = 'block';
            return false;
        }
        document.getElementById(idNoti).innerHTML = '';
        document.getElementById(idNoti).style.display = 'none';
        return true;
    }
}