jest.mock("../services/userServices", () =>
  jest.requireActual("../services/_mock_/userServices.js")
);
const { create } = require('../controllers/userController');

describe('User test group', ()=>{
  describe('Create User', ()=>{
    it('Create', async()=>{
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      }

      const req = {
        body: {
          email: "test@test.com",
          name: "Ray",
          last_name: "SC",
          password: "qwerty123456"
        }
      }

      await create(req, res)
      expect(res.status.mock.calls).toEqual([[201]]);
      expect(res.send.mock.calls).toEqual([[{user: expect.objectContaining({is_active: true})}]])
    })

    it('Create Error', async()=>{
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      }

      const req = {
        body: {
          name: "Ray",
          last_name: "SC",
          password: "qwerty123456"
        }
      }

      await create(req, res)
      expect(res.status.mock.calls).toEqual([[409]]);
    })
  })
})