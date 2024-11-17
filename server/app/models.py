# food model
def food_model(request):
    fmodel = {
        "topicID": request.json.get("topicID"), 
        "groupID": request.json.get("groupID"), 
        "name": request.json.get("name"),
        "info": request.json.get("info"),
        "cost": request.json.get("cost"),
        "price": request.json.get("price"),
        "stored": request.json.get("stored"),
        "image": request.json.get("image"),
        "tag": request.json.get("tag"),
        "sold": request.json.get("sold"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
        "stated": request.json.get("stated"),
        "favorited": request.json.get("favorited"),
    }

    fmodel = {key: value for key, value in fmodel.items() if value is not None}
    return fmodel

# topic model
def topic_model(request):
    fmodel = {
        "name": request.json.get("name"),
        "image": request.json.get("image"),
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
        "food": request.json.get("food"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
    }

    model = {key: value for key, value in model.items() if value is not None}
    return model


# cart food model
def cart_model(request):
    model = {
        "userID": request.json.get("userID"),
        "detail": request.json.get("detail"),  #json type
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
    }

    model = {key: value for key, value in model.items() if value is not None}
    return model


# cart food model
def review_model(request):
    model = {
        "user": request.json.get("user"), #object type
        "checkID": request.json.get("checkID"),
        "food": request.json.get("food"),
        "liked": request.json.get("liked"),
        "comment": request.json.get("comment"),
        "rating": request.json.get("rating"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
    }

    model = {key: value for key, value in model.items() if value is not None}
    return model

# notify model
def notify_model(request):
    fmodel = {
        "order": request.json.get("order"), #object type
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
        "content": request.json.get("content"),
        "viewed": request.json.get("viewed"),
    }

    fmodel = {key: value for key, value in fmodel.items() if value is not None}
    return fmodel

# user address model
def address_model(request):
    model = {
        "userID": request.json.get("userID"),
        "username": request.json.get("username"),
        "phone": request.json.get("phone"),
        "address": request.json.get("address"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
        "actived": request.json.get("actived"),
    }

    model = {key: value for key, value in model.items() if value is not None}
    return model

# admin account model
def user_model(request):
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
        "roleDetail": request.json.get("roleDetail"),
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

#  import coupon model
def import_coupon_model(request):
    model = {
        "supplier": request.json.get("supplier"),
        "staff": request.json.get("staff"),
        "detail": request.json.get("detail"), #json type
        "total": request.json.get("total"),
        "noted": request.json.get("noted"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
        "editedID": request.json.get("editedID"),
    }

    model = {key: value for key, value in model.items() if value is not None}
    return model


#  import coupon model
def food_type_model(request):
    model = {
        "name": request.json.get("name"),
        "detail": request.json.get("detail"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
    }

    model = {key: value for key, value in model.items() if value is not None}
    return model

#  import coupon model
def import_coupon_detail_model(request):
    model = {
        "foodTypeID": request.json.get("foodTypeID"),
        "name": request.json.get("name"),
        "cost": request.json.get("cost"),
        "quantity": request.json.get("quantity"),
        "unit": request.json.get("unit"),
        "exp": request.json.get("exp"),
        "caution": request.json.get("caution"),
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
        "address": request.json.get("address"),
        "detail": request.json.get("detail"), #json type
        "deliverymanID": request.json.get("deliverymanID"),
        "deliveryTime": request.json.get("deliveryTime"),
        "payment": request.json.get("payment"),
        "total": request.json.get("total"),
        "createdAt": request.json.get("createdAt"),
        "updatedAt": request.json.get("updatedAt"),
        "status": request.json.get("status"),
        "review": request.json.get("review"),
        "rating": request.json.get("rating"),
    }

    model = {key: value for key, value in model.items() if value is not None}
    return model
