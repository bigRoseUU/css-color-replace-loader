import { getOptions} from 'loader-utils'
import tinycolor from 'tinycolor2'
import { loader } from 'webpack'

const colorRegCache: {
  [index: string]: RegExp
} = {}

let loaderFn: loader.Loader = function (content) {

  if (typeof content !== 'string') {
    throw new Error('只能接受 string 类型内容')
  }

  const options: any = getOptions(this)

  let colorMap: {
    [index: string]: string
  } = options.colorMap

  for (let color in colorMap) {
    let colorObj = tinycolor(color)

    if (!colorObj.isValid()) continue

    let colorReg = colorRegCache[color] || new RegExp(`(${colorObj.toHexString()})|(${colorObj.toHexString().toUpperCase()})|(${colorObj.toRgbString()})`, 'g')

    colorRegCache[color] = colorReg

    content = content.replace(
      colorReg,
      `" + (${ colorMap[color] }) + "`
    );
  }
  return content;
}


export default loaderFn