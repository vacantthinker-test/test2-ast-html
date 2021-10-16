/**
 *
 * @param template
 * @param data
 */
export function parse(template, data) {
  
  let index = 0; // 指针
  let tail = template; // 尾巴, 未处理的部分
  
  let stackTag = []; // 标签栈
  let stackContent = [{children: []}]; // 内容栈
  
  let regexTagStart = /^\<([a-z]+[1-6]*)\>/
  let regexTagEnd = /^\<\/([a-z]+[1-6]*)\>/
  let regexContent = /^([^\<]*)\<\/([a-z]+[1-6]*)\>/
  let regexMustache = /^([\w\s]*)\{\{([\w\s]+)\}\}/
  
  let regexEmpty = /^\s+$/
  let regexEmptyStart = /^(\s+)\<[a-z]+[1-6]*\>/
  
  while (index < template.length) {
    tail = template.substring(index); // 每次循环更新尾巴
    
    if (regexTagStart.test(tail)) {
      let match = tail.match(regexTagStart)
      let tagStart = match[1];
      
      stackTag.push(tagStart);
      stackContent.push({
        tag: tagStart, children: []
      });
      
      index += tagStart.length + 2; // 标签本身长度 + <>
    } else if (regexTagEnd.test(tail)) {
      let match = tail.match(regexTagEnd)
      let tagEnd = match[1];
      // console.log('end',tagEnd)
      
      // 出栈
      stackTag.pop();
      let popElement = stackContent.pop();
      // console.log(popElement.tag)
      let tagStart = popElement.tag;
      if (tagEnd === tagStart) {
        let topElement = stackContent[stackContent.length - 1];
        // console.log(topElement)
        topElement.children.push(popElement);
        
      } else {
        throw new Error('html标签关闭不正确')
      }
      
      index += tagEnd.length + 3; // 标签本身长度 + </>
    } else if (regexContent.test(tail)) { // 匹配标签内的文本内容
      let match = tail.match(regexContent)
      let content = match[1];
      if (regexEmpty.test(content)) {
        // console.log('empty content')
        // console.log(content)
      } else {
        if (regexMustache.test(content)) {
          let m = content.match(regexMustache);
          let before = m[1];
          let name = m[2];
          let value = data[name];
          // console.log(before, name, value)
          let result = before + value;
          // console.log(result)
          stackContent[stackContent.length - 1].children.push({
            value: result, type: 3
          })
        } else {
          stackContent[stackContent.length - 1].children.push({
            value: content, type: 3
          })
          
        }
        
      }
      
      index += content.length;
    } else if (regexEmptyStart.test(tail)) {
      let match = tail.match(regexEmptyStart)
      // console.log(match)
      let empty = match[1];
      // console.log(empty, empty.length)
      index += empty.length;
    } else {
      index++;
      
    }
  }
  
  // console.log(stackTag)
  // console.log(stackContent)
  
  return stackContent[0].children[0];
}