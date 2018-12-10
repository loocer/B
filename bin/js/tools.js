const w = laya.utils.Browser.width
const h = laya.utils.Browser.height
const wl = w>>2
const wh = w>>1
const vh = h>>1
const PLAYERSPOSITION_EIGHT = [
    [wl,h-200],
    [wl*3,h-200],
    [w-200,vh+300],
    [w-200,vh-300],
    [wl*3,200],
    [wl,200],
    [200,vh-300],
    [200,vh+300],
]
const PLAYERSPOSITION_SIX = [
    [w>>1,h-200],
    [w-200,vh+300],
    [w-200,vh-300],
    [w>>1,200],
    [200,vh-300],
    [200,vh+300],
]
const PLAYERSPOSITION_FOUR = [
    [w>>1,h-200],
    [w-200,vh],
    [w>>1,200],
    [200,vh],
]