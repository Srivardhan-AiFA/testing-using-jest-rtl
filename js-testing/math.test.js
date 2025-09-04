const { sum, substract, findTheGreatest } = require("./math")

test("testing sum", () => {
    expect(sum(1, 2)).toBe(3)
    expect(sum(-4, 5)).toBe(1)
    expect(sum(2, -2)).toBe(0)
    expect(sum(-3, -7)).toBe(-10)
})

test("testing substraction", () => {
    expect(substract(2, 1)).toBe(1)
    expect(substract(-2, 1)).toBe(-3)
    expect(substract(-2, -1)).toBe(-1)
    expect(substract(2, -1)).toBe(3)
})

test("finding the greatest element from a and b", () => {
    expect(findTheGreatest(1, 2)).toBe(2)
    expect(findTheGreatest(3, -1)).toBe(3)
    expect(findTheGreatest(-1, 7)).toBe(7)
    expect(findTheGreatest(0, -1)).toBe(0)
})