# food model
def food_model(request):
    fmodel = {
        "topicID": request.json.get("topicID"), 
        "groupID": request.json.get("groupID"), 
        "name": request.json.get("name"),
        "info": request.json.get("info"),
        "cost": request.json.get("cost"),
        "price": request.json.get("price"),
        "quantity": request.json.get("quantity"),
        "image": request.json.get("image"),
        "tag": request.json.get("tag"),
        "rating": request.json.get("rating"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
        "stated": request.json.get("stated"),
    }

    fmodel = {key: value for key, value in fmodel.items() if value is not None}
    return fmodel

# topic model
def topic_model(request):
    fmodel = {
        "name": request.json.get("name"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
    }

    fmodel = {key: value for key, value in fmodel.items() if value is not None}
    return fmodel

# foodGroup model
def foodGroup_model(request):
    fmodel = {
        "topicID": request.json.get("topicID"),
        "name": request.json.get("name"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
    }

    fmodel = {key: value for key, value in fmodel.items() if value is not None}
    return fmodel

# favorite food model
def favorited_model(request):
    model = {
        "userID": request.json.get("userID"),
        "foodID": request.json.get("foodID"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
    }

    model = {key: value for key, value in model.items() if value is not None}
    return model

# recipe model
def recipe_model(request):
    fmodel = {
        "foodId": request.json.get("foodId"),
        "video": request.json.get("video"),
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
        "gender": request.json.get("gender"),
        "birthday": request.json.get("birthday"),
        "phone": request.json.get("phone"),
        "address": request.json.get("address"),
        "email": request.json.get("email"),
        "password": request.json.get("password"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
        "actived": request.json.get("actived"),
    }

    umodel = {key: value for key, value in umodel.items() if value is not None}
    return umodel

# user address model
def address_model(request):
    model = {
        "userID": request.json.get("userID"),
        "address": request.json.get("address"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
        "actived": request.json.get("actived"),
    }

    model = {key: value for key, value in model.items() if value is not None}
    return model

# admin account model
def staff_model(request):
    model = {
        "name": request.json.get("name"),
        "gender": request.json.get("gender"),
        "image": request.json.get("image"),
        "email": request.json.get("email"),
        "password": request.json.get("password"),
        "birthday": request.json.get("birthday"),
        "phone": request.json.get("phone"),
        "address": request.json.get("address"),
        "role": request.json.get("role"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
        "actived": request.json.get("actived"),
    }

    model = {key: value for key, value in model.items() if value is not None}
    return model

# role model
def role_model(request):
    model = {
        "role": request.json.get("role"),
        "description": request.json.get("description"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
    }

    model = {key: value for key, value in model.items() if value is not None}
    return model

# comment model
def comment_model(request):
    model = {
        "foodID": request.json.get("foodID"),
        "userID": request.json.get("userID"),
        "dateTime": request.json.get("dateTime"),
        "content": request.json.get("content"),
        "reply": request.json.get("reply"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
    }

    model = {key: value for key, value in model.items() if value is not None}
    return model

# rating model
def rate_model(request):
    model = {
        "foodID": request.json.get("foodID"),
        "userID": request.json.get("userID"),
        "foodID": request.json.get("foodID"),
        "voted": request.json.get("voted"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
    }

    model = {key: value for key, value in model.items() if value is not None}
    return model

# supplier model
def supplier_model(request):
    model = {
        "represent": request.json.get("represent"),
        "name": request.json.get("name"),
        "address": request.json.get("address"),
        "phone": request.json.get("phone"),
        "email": request.json.get("email"),
        "password": request.json.get("password"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
        "actived": request.json.get("actived"),
    }

    model = {key: value for key, value in model.items() if value is not None}
    return model

#  import coupon model
def importCoupon_model(request):
    model = {
        "supplierID": request.json.get("supplierID"),
        "staffID": request.json.get("staffID"),
        "detail": request.json.get("detail"), #json type
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
    }

    model = {key: value for key, value in model.items() if value is not None}
    return model

#  order model
def order_model(request):
    model = {
        "userID": request.json.get("userID"),
        "staffID": request.json.get("staffID"),
        "detail": request.json.get("detail"), #json type
        "deliveryMan": request.json.get("deliveryMan"),
        "deliveryTime": request.json.get("deliveryTime"),
        "payment": request.json.get("payment"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
        "stated": request.json.get("stated"),
    }

    model = {key: value for key, value in model.items() if value is not None}
    return model

#  payment model
def payment_model(request):
    model = {
        "payment": request.json.get("payment"),
        "description": request.json.get("description"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
    }

    model = {key: value for key, value in model.items() if value is not None}
    return model

#  delivery model
def delivery_model(request):
    model = {
        "name": request.json.get("name"),
        "deliveryMan": request.json.get("deliveryMan"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
        "actived": request.json.get("actived"),
    }

    model = {key: value for key, value in model.items() if value is not None}
    return model