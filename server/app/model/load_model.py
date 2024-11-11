import joblib


def load_model():
    # Tải lại mô hình từ file
    model = joblib.load('./app/static/food_idea_model.pkl')
    return model


def located_code(text):
    code_list = [
        {"Thành phố Hồ Chí Minh TP. Hồ Chí Minh HCM": 41},
        {"Hà Nội": 29},
        {"Đà Nẵng": 43},
        {"Bình Dương": 61},
        {"Đồng Nai": 39},
        {"Khánh Hoà": 79},
        {"Hải Phòng": 15},
        {"Long An": 62},
        {"Quảng Nam": 92},
        {"Bà Rịa - Vũng Tàu": 72},
        {"Đăk Lăk": 47},
        {"Cần Thơ": 65},
        {"Bình Thuận": 86},
        {"Lâm Đồng": 49},
        {"Thừa Thiên Huế": 75},
        {"Kiên Giang": 68},
        {"Bắc Ninh": 99},
        {"Quảng Ninh": 14},
        {"Thanh Hoá": 36},
        {"Nghệ An": 37},
        {"Hải Dương": 34},
        {"Gia Lai": 81},
        {"Bình Phước": 93},
        {"Hưng Yên": 89},
        {"Bình Định": 77},
        {"Tiền Giang": 63},
        {"Thái Bình": 17},
        {"Bắc Giang": 98},
        {"Hoà Bình": 28},
        {"An Giang": 67},
        {"Vĩnh Phúc": 88},
        {"Tây Ninh": 70},
        {"Thái Nguyên": 20},
        {"Lào Cai": 24},
        {"Nam Định": 18},
        {"Quảng Ngãi": 76},
        {"Bến Tre": 71},
        {"Đăk Nông": 48},
        {"Cà Mau": 69},
        {"Vĩnh Long": 64},
        {"Ninh Bình": 35},
        {"Phú Thọ": 19},
        {"Ninh Thuận": 85},
        {"Phú Yên": 78},
        {"Hà Nam": 90},
        {"Hà Tĩnh": 38},
        {"Đồng Tháp": 66},
        {"Sóc Trăng": 83},
        {"Kon Tum": 82},
        {"Quảng Bình": 73},
        {"Quảng Trị": 74},
        {"Trà Vinh": 84},
        {"Hậu Giang": 95},
        {"Sơn La": 26},
        {"Bạc Liêu": 94},
        {"Yên Bái": 21},
        {"Tuyên Quang": 22},
        {"Điện Biên": 27},
        {"Lai Châu": 25},
        {"Lạng Sơn": 12},
        {"Hà Giang": 23},
        {"Bắc Cạn": 97},
        {"Cao Bằng": 11},
    ]
    for item in code_list:
        for key in item:
            if text in key:
                return item[key]
    return None
