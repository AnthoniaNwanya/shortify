// const tokenRedirect = require('../../middleware/authentication')

// describe('tokenRedirect', () => {
//   /**
//    * Mocked Express Request object.
//    */
//   let req

//   /**
//    * Mocked Express Response object.
//    */
//   let res

//   /**
//    * Mocked Express Next function.
//    */
//   let next = jest.fn()

//   beforeEach(() => {
//     req = {
//       body: {}
//     }

//     res = {
//       query: {},
//       headers: {},
//       data: null,
//       json(payload) {
//         this.data = JSON.stringify(payload)
//       },
//       cookie(name, value, options) {
//         this.headers[name] = value
//     }
//   }

//   next.mockReset()
// })

// test('should correctly set cookie', async (req, res, next) => {
//   const expectedToken = 'expected'
//   res.cookies.token = ''

//   tokenRedirect(req, res, next)

//   expect(res.headers.token).toBeDefined()
//   expect(res.headers.token).toEqual(expectedToken)
// })
// })