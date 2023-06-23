
const  User  = require("../../schema/UserSchema");
const db = require("./database");

const userData = {
  username: "Lou",
  email: "lou@gmail.com",
  password: "Lou1234#",
};

beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});

describe("User model", () => {
  it("create and save user successfully in the database", async () => {
    const validUser = new User(userData);
    // await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();
 
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBeDefined();
    expect(savedUser.password).toBe("Lou1234#");
    expect(savedUser.URLS).toBeDefined();
  
  });
})

  // You shouldn't be able to add in any field that isn't defined in the schema
//   it("insert user successfully, but the field not defined in schema should be undefined", async () => {
//     const userWithInvalidField = new User({
//       ...userData,
//       nickname: "Handsome TekLoon",
//     });
//     await userWithInvalidField.setPassword(userData.password);
//     const savedUserWithInvalidField = await userWithInvalidField.save();
//     expect(savedUserWithInvalidField._id).toBeDefined();
//     expect(savedUserWithInvalidField.nickname).toBeUndefined();
//   });

  // It should us tell us the errors in on email field.
//   it("create user without required field should failed", async () => {
//     const userWithoutRequiredField = new User({ name: "TekLoon" });
//     let err;
//     try {
//       const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
//     } catch (error) {
//       err = error;
//     }
//     expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
//     expect(err.errors.email).toBeDefined();
//   });
// });

// const request = require('supertest');
// const app = require('../../index');
// const { connect } = require('./database');

// describe('User', () => {
//     let conn;
//     beforeAll(async () => {
//         conn = await connect();
//     })

//     afterEach(async () => {
//         await conn.cleanup();
//     })

//     afterAll(async () => {
//         await conn.disconnect();
//     });
//     it('tests /api/user endpoint', async () => {
//         const response = await request(app).get("/api/user");
//         expect(response.body).toHaveProperty(
//             "success",
//             "status",
//             "statusCode",
//             "data"
//         );
//         expect(response.body).toHaveLength(5);
//         // expect(response.statusCode).toBe(200);
//         // Testing a single element in the array
//         // expect(response.body).toEqual(expect.arrayContaining(['Earth']));
//     });
// });