const rewire = require("rewire")
const setup_dev_server = rewire("./setup-dev-server")
const readFile = setup_dev_server.__get__("readFile")
// @ponicode
describe("readFile", () => {
    test("0", () => {
        let callFunction = () => {
            readFile("/usr/share", "InfoPlist.strings")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            readFile("/usr/ports", "navix377.py")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            readFile("/usr/ports", "libclang.dylib")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            readFile("/opt/share", "./data/population.csv")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            readFile("/usr/ports", "Info.plist")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            readFile(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
