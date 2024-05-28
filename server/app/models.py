# food model
def food_model(request):
    fmodel = {
        "gid": request.json.get("gid"),
        "fid": request.json.get("fid"),
        "name": request.json.get("name"),
        "introduce": request.json.get("introduce"),
        "image": request.json.get("image"),
        "video": request.json.get("video"),
        "tag": request.json.get("tag"),
        "nutri": request.json.get("nutri"),
        "like": request.json.get("like"),
        "vote": request.json.get("vote"),
    }

    fmodel = {key: value for key, value in fmodel.items() if value is not None}
    return fmodel

# favorite food model
def favorite_model(request):
    model = {
        "uid": request.json.get("uid"),
        "fid": request.json.get("fid"),
        "type": request.json.get("type"),
        "date": request.json.get("date"),
    }

    model = {key: value for key, value in model.items() if value is not None}
    return model

# recipe model
def recipe_model(request):
    fmodel = {
        "gid": request.json.get("gid"),
        "fid": request.json.get("fid"),
        "name": request.json.get("name"),
        "ingredients": request.json.get("ingredients"),
        "processing": request.json.get("processing"),
    }

    fmodel = {key: value for key, value in fmodel.items() if value is not None}
    return fmodel

# user account model
def user_model(request):
    umodel = {
        "name": request.json.get("name"),
        "image": request.json.get("image"),
        "email": request.json.get("email"),
        "password": request.json.get("password"),
        "role": request.json.get("role"),
        "birth": request.json.get("birth")
    }

    umodel = {key: value for key, value in umodel.items() if value is not None}
    return umodel


# admin account model
def admin_model(request):
    admodel = {
        "name": request.json.get("name"),
        "image": request.json.get("image"),
        "email": request.json.get("email"),
        "password": request.json.get("password"),
        "role": request.json.get("role"),
        "birth": request.json.get("birth"),
        "permission": request.get("permission")
    }

    admodel = {key: value for key, value in admodel.items() if value is not None}
    return admodel

# comment model
def comment_model(request):
    model = {
        "uid": request.json.get("uid"),
        "fid": request.json.get("fid"),
        "type": request.json.get("type"),
        "date": request.json.get("date"),
        "content": request.json.get("content"),
        "reply": request.json.get("reply"),
    }

    model = {key: value for key, value in model.items() if value is not None}
    return model