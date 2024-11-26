import joblib


def load_model():
    # Tải lại mô hình từ file
    model = joblib.load('./app/static/food_opt_model.pkl')
    return model
