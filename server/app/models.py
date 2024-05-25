
def food_model(request):
    fmodel = {
        "name": request.json.get("name"),
        "code": request.json.get("code"),
        "image": request.json.get("image"),
        "video": request.json.get("video"),
    }

    fmodel = {key: value for key, value in fmodel.items() if value is not None}
    return fmodel

