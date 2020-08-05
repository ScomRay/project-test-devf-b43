const Services = jest.genMockFromModule('../userServices')

function create(body) {
  const keys = ['name', 'last_name', 'email', 'password']
  const newUser = {
    "is_admin": false,
    "is_active": true,
    "_id": "5f20c8c48778541248307180",
    "name": "Pepito",
    "last_name": "Perez",
    "email": "Pepito@test.com",
    "password": "contrasena",
    "phone_number": 123245675,
    "createdAt": "2020-07-29T00:54:28.834Z",
    "updatedAt": "2020-07-29T00:54:28.834Z",
    "__v": 0
  }

  return new Promise((resolve, reject) => {
    if(keys.every((key) => Object.keys(body).includes(key))){
      resolve(newUser)
    } else {
      reject(new Error("Mongo error"))
    }
  })
}

function getUsers() {
  const users = [
    {
    "is_admin": false,
    "is_active": true,
    "_id": "5f20c8c48778541248307180",
    "name": "Pepito",
    "last_name": "Perez",
    "email": "Pepito@test.com",
    "password": "contrasena",
    "phone_number": 123245675,
    "createdAt": "2020-07-29T00:54:28.834Z",
    "updatedAt": "2020-07-29T00:54:28.834Z",
    "__v": 0
    }
  ]
  return new Promise((resolve) => {
    resolve(users)
  })
}

Services.create = create
Services.getUsers = getUsers

module.exports = Services